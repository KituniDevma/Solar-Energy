from django.contrib.auth.models import User
from rest_framework import generics, views
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, LocationWeather, LocationForecasts
from django.http import JsonResponse, HttpResponse
import requests
from .encoder import json_to_csv, encoder, decoder
import subprocess
from django.utils import timezone
from dotenv import load_dotenv
import os

load_dotenv()

# Create your views here.
class LocationListCreate(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    Permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the logged-in user
        user = request.user
        
        # Get the profile of the user and their locations
        profile = Profile.objects.get(user=user)
        locations = profile.locations

        # Return the locations in a response
        return JsonResponse({'locations': locations})
    
    def post(self, request, *args, **kwargs):
        # Get the logged-in user
        user = request.user
        
        # Get the profile of the user
        profile = Profile.objects.get(user=user)

        # Add the new location to the locations array
        new_location = request.data.get('location')
        if new_location:
            if new_location not in profile.locations:
                profile.locations.append(new_location)
                profile.save()
                return JsonResponse({'message': 'Location added successfully', 'locations': profile.locations})
            else:
                return JsonResponse({'error': 'Location already exists'}, status=400)
        else:
            return JsonResponse({'error': 'Location not provided'}, status=400)

class DimesionsListCreate(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    Permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the logged-in user
        user = request.user
        
        # Get the profile of the user and their locations
        profile = Profile.objects.get(user=user)
        width = profile.width
        length = profile.length

        # Return the locations in a response
        return JsonResponse({'dimensions': [width, length]})
    
    def post(self, request, *args, **kwargs):
        # Get the logged-in user
        user = request.user
        
        # Get the profile of the user
        profile = Profile.objects.get(user=user)

        # Add the new location to the locations array
        new_dimesions = request.data.get('dimensions')
        if new_dimesions:
            profile.width = new_dimesions[0]
            profile.length = new_dimesions[1]
            profile.save()
            return JsonResponse({'message': 'Location added successfully', 'dimensions': [profile.width, profile.length]})

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


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

class WeatherView(views.APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request):
        location = request.GET.get('location')
        today = timezone.now().date()
        date1 = today - timezone.timedelta(days=14)
        date2 = today - timezone.timedelta(days=1)

        try:
            location_weather = LocationWeather.objects.get(location=location, date_created__date=today)
            json_to_csv(location_weather.weather_data)
            return JsonResponse({'status': 'Successful'}, status=200)
        except LocationWeather.DoesNotExist:
            APIKEY = 'P6FAKNRNT7GZCS3VH6VLRQ6WE' #os.getenv(APIKEY)
            api_url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/{date1.strftime("%Y-%m-%d")}/{date2.strftime("%Y-%m-%d")}?unitGroup=metric&include=hours&key={APIKEY}&contentType=json'

            try:
                response = requests.get(api_url)
                response.raise_for_status()
                weather_data = response.json()

                LocationWeather.objects.create(location=location, weather_data=weather_data)
                
                json_to_csv(weather_data)
                return JsonResponse({'status': 'Successful', 'data': weather_data}, status=200)
            except requests.exceptions.RequestException as e:
                return JsonResponse({'status': 'Failed', 'error': str(e)}, status=500)

class DataView(views.APIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]    

    def get(self, request):
        with open('./model/results/real_prediction.csv', 'r') as file:
            data = file.read()

        response = HttpResponse(data, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="prediction.csv"'
        return response

class ModelView(views.APIView):
    permisison_classes = [AllowAny]
    serializer_class = UserSerializer

    def get(self, request):
        location = request.GET.get('location')
        today = timezone.now().date()

        user = request.user
        profile = Profile.objects.get(user=user)
        width = profile.width
        length = profile.length

        try:
            location_forecast = LocationForecasts.objects.get(location=location, date_created__date=today)
            mean, sum = decoder(location_forecast.forecast_data, width, length)
            return JsonResponse({'status': 'Successful', 'output': [mean, sum]}, status=200)
        except LocationForecasts.DoesNotExist:
            try:
                result = subprocess.run(
                    [
                        'python', '-u', './model/run_longExp.py',
                        '--random_seed', '2021',
                        '--is_training', '4',
                        '--root_path', './model/dataset/',
                        '--data_path', 'data.csv',
                        '--model_id', '336_48',
                        '--model', 'PatchTST',
                        '--data', 'custom',
                        '--features', 'MS',
                        '--seq_len', '336',
                        '--pred_len', '48',
                        '--label_len', '48',
                        # '--enc_in', '21',
                        # '--e_layers', '3',
                        # '--n_heads', '16',
                        # '--d_model', '128',
                        # '--d_ff', '256',
                        # '--dropout', '0.2',
                        # '--fc_dropout', '0.2',
                        # '--head_dropout', '0',
                        # '--patch_len', '16',
                        # '--stride', '8',
                        '--des', 'test',
                        '--train_epochs', '100',
                        '--patience', '20',
                        '--itr', '1',
                        '--batch_size', '128',
                        '--learning_rate', '0.0001'
                    ],
                    capture_output=True,
                    text=True
                )

                if result.returncode == 0:
                    forecast_data, mean, sum = encoder(width, length)
                    LocationForecasts.objects.create(location=location, forecast_data=forecast_data)
                    return JsonResponse({'status': 'success', 'message': 'Model training completed successfully', 'output': [mean, sum]}, status=200)
                else: 
                    print(result.stderr)           
                    return JsonResponse({'status': 'error', 'message': 'Model training failed', 'error': result.stderr}, status=500)
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)}, status=500)