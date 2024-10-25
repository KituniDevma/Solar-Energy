from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    locations = serializers.ListField(
        child=serializers.CharField(max_length=200),
        allow_null=True,
        required=False,
        default=["Colombo", "Galle", "Kandy"])
    width = serializers.FloatField(required=False, default=1.0)
    length = serializers.FloatField(required=False, default=2.0)
    
    class Meta:
        model = Profile
        fields = ('locations','width', 'length')

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username','email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        user = User.objects.create_user(**validated_data)
        
        Profile.objects.create(user=user,
                               locations=profile_data.get('locations', ["Colombo", "Galle", "Kandy"]),)
        
        return user
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        locations = profile_data.get('locations')

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        profile = instance.profile
        if locations is not None:
            profile.locations = locations
        profile.save()
        instance.save()
        return instance
    