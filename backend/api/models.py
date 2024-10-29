from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone
import json

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    locations = models.JSONField(default=list, null=True, blank=True)
    width = models.FloatField(default=1.0)
    length = models.FloatField(default=2.0)

    def __str__(self):
        return self.user.username

class LocationWeather(models.Model):
    location = models.CharField(max_length=100)
    weather_data = models.JSONField()
    date_created = models.DateTimeField(auto_now_add=True, primary_key=True)

    class Meta:
        unique_together = ('location', 'date_created')

    def __str__(self):
        return f"{self.location} - {self.date_created}"

    def weather_as_json(self):
        return json.dumps(self.weather_data)

class LocationForecasts(models.Model):
    location = models.CharField(max_length=100)
    forecast_data = models.JSONField()
    date_created = models.DateTimeField(auto_now_add=True, primary_key=True)

    class Meta:
        unique_together = ('location', 'date_created')

    def __str__(self):
        return f"{self.location} - {self.date_created}"

    def forecast_as_json(self):
        return json.dumps(self.forecast_data)