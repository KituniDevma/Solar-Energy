from django.urls import path
from . import views

urlpatterns = [
    path('location/', views.LocationListCreate.as_view(), name='location-list'),
    path('location/delete/<int:pk>/', views.LocationDelete.as_view(), name='delete-location')
]