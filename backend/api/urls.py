from django.urls import path
from . import views

urlpatterns = [
    path('location/', views.LocationListCreate.as_view(), name='location-list'),
    # path('location/delete/<int:pk>/', views.LocationDelete.as_view(), name='delete-location'),
    path('weather/', views.WeatherView.as_view(), name='get-weather'),
    path('data/', views.DataView.as_view(), name='get-data'),
    path('model/', views.ModelView.as_view(), name='run-model'),
    path('dimensions/', views.DimesionsListCreate.as_view(), name='user-dimensions'),
]