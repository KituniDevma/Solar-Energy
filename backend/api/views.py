from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LocationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Location
from django.http import JsonResponse, HttpResponse
import requests
from .encoder import json_to_csv
import os
import subprocess

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LocationListCreate(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)
        
class LocationDelete(generics.DestroyAPIView):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(user=user)
    
def get_weather(request):
    location = request.GET.get('location')

    api_url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/2024-09-05/2024-09-05?unitGroup=metric&include=days&key=P6FAKNRNT7GZCS3VH6VLRQ6WE&contentType=json'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        weather_data = response.json()
        json_to_csv(weather_data)
        return JsonResponse({'status': 'Successful'}, status=200)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'status': 'Failed', 'error': str(e)}, status=500)
    
def get_data(request):
    with open('./model/results/real_prediction.csv', 'r') as file:
        data = file.read()

    response = HttpResponse(data, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="prediction.csv"'
    return response

def run_model(request):
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
            return JsonResponse({'status': 'success', 'message': 'Model training completed successfully', 'output': result.stdout}, status=200)
        else:
            return JsonResponse({'status': 'error', 'message': 'Model training failed', 'error': result.stderr}, status=500)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)