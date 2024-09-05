from django.urls import path
from . import views

urlpatterns = [
    path('location/', views.LocationListCreate.as_view(), name='location-list'),
    path('location/delete/<int:pk>/', views.LocationDelete.as_view(), name='delete-location'),
    path('weather/', views.get_weather, name='get-weather'),
    path('data/', views.get_data, name='get-data'),
    path('model/', views.run_model, name='run-model')
]