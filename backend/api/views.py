from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LocationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Location
from django.http import JsonResponse, HttpResponse
import requests
from .encoder import json_to_csv

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

    api_url = f'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{location}/2022-01-29/2022-01-30?unitGroup=metric&include=hours&key=7EZKZKPQMNU2R2ZU6HR2T45S7&contentType=json'

    try:
        response = requests.get(api_url)
        response.raise_for_status()
        weather_data = response.json()
        json_to_csv(weather_data)
        return JsonResponse(weather_data, safe=False)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def get_data(request):
    with open('test.csv', 'r') as file:
        data = file.read()

    response = HttpResponse(data, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="data.csv"'
    return response