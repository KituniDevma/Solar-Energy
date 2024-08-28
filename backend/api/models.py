from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='locations')

    def __str__(self):
        return self.name