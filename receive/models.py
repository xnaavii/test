from django.db import models

# Create your models here.
class GPSTracker(models.Model):
    timestamp = models.DateTimeField(auto_now=True)
    longtitude = models.FloatField()
    lattitude = models.FloatField()