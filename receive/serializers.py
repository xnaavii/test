from rest_framework import serializers
from .models import GPSTracker

class GPSDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPSTracker
        fields = ['latitude', 'longitude', 'timestamp']
