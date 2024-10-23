from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, LocationWeather, LocationForecasts
from django.http import JsonResponse, HttpResponse
import requests
from .encoder import json_to_csv, encoder, decoder
import subprocess
from django.utils import timezone

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UpdateUserLocationsView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        locations = request.data.get('locations', [])

        if isinstance(locations, list):
            user.profile.locations = locations
            user.profile.save()

        return self.partial_update(request, *args, **kwargs)

class RemoveUserLocationView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        location = request.data.get('location', None)

        if location in user.profile.locations:
            user.profile.locations.remove(location)
            user.profile.save()

        return self.partial_update(request, *args, **kwargs)

    
def get_weather(request):
    location = request.GET.get('location')
    today = timezone.now().date()
    date1 = today - timezone.timedelta(days=14)
    date2 = today - timezone.timedelta(days=1)

    try:
        location_weather = LocationWeather.objects.get(location=location, date_created__date=today)
        json_to_csv(location_weather.weather_data)
        # print(location_weather.weather_data)
        return JsonResponse({'status': 'Successful'}, status=200)
    except LocationWeather.DoesNotExist:
        api_url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{date1.strftime("%Y-%m-%d")}/{date2.strftime("%Y-%m-%d")}?unitGroup=metric&include=hours&key=7EZKZKPQMNU2R2ZU6HR2T45S7&contentType=json'

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            weather_data = response.json()

            LocationWeather.objects.create(location=location, weather_data=weather_data)
            
            json_to_csv(weather_data)
            return JsonResponse({'status': 'Successful', 'data': weather_data}, status=200)
        except requests.exceptions.RequestException as e:
            return JsonResponse({'status': 'Failed', 'error': str(e)}, status=500)
    
def get_data(request):
    with open('./model/results/real_prediction.csv', 'r') as file:
        data = file.read()

    response = HttpResponse(data, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="prediction.csv"'
    return response

def run_model(request):
    location = request.GET.get('location')
    today = timezone.now().date()

    try:
        location_forecast = LocationForecasts.objects.get(location=location, date_created__date=today)
        decoder(location_forecast.forecast_data)
        return JsonResponse({'status': 'Successful'}, status=200)
    except LocationForecasts.DoesNotExist:
        try:
            result = subprocess.run(
                [
                    'python', '-u', './model/run_longExp.py',
                    '--random_seed', '2021',
                    '--is_training', '4',
                    '--root_path', './model/dataset/',
                    '--data_path', 'data.csv',
                    '--model_id', '336_24',
                    '--model', 'PatchTST',
                    '--data', 'custom',
                    '--features', 'MS',
                    '--seq_len', '336',
                    '--pred_len', '24',
                    '--label_len', '24',
                    '--enc_in', '21',
                    '--e_layers', '3',
                    '--n_heads', '16',
                    '--d_model', '128',
                    '--d_ff', '256',
                    '--dropout', '0.2',
                    '--fc_dropout', '0.2',
                    '--head_dropout', '0',
                    '--patch_len', '16',
                    '--stride', '8',
                    '--train_epochs', '50',
                    '--patience', '10',
                    '--itr', '1',
                    '--batch_size', '128',
                    '--learning_rate', '0.0001'
                ],
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                forecast_data = encoder()
                LocationForecasts.objects.create(location=location, forecast_data=forecast_data)
                return JsonResponse({'status': 'success', 'message': 'Model training completed successfully', 'output': result.stdout}, status=200)
            else:            
                return JsonResponse({'status': 'error', 'message': 'Model training failed', 'error': result.stderr}, status=500)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)