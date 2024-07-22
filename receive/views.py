from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import GPSTracker
from .serializers import GPSDataSerializer
from django.shortcuts import render

def index(request):
    gpsdata = GPSTracker.objects.all()

    context = {"gpsdata": gpsdata}

    return render(request, 'receive/index.html', context)

@api_view(["POST"])
def receive_gps_data(request):
    serializer = GPSDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
