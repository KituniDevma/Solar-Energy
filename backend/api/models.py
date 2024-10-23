from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
import json

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    locations = models.JSONField(default=list, null=True, blank=True)

    def __str__(self):
        return self.user.username

class LocationWeather(models.Model):
    location = models.CharField(max_length=100, primary_key=True)
    weather_data = models.JSONField()
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.location
    
    def weather_as_json(self):
        return json.dumps(self.weather_data)
    
class LocationForecasts(models.Model):
    location = models.CharField(max_length=100, primary_key=True)
    forecast_data = models.JSONField()
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.location

    def forecast_as_json(self):
        return json.dumps(self.forecast_data)