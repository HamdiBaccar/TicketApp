from event.models import Event
from django.db import models
from user.models import User

class Rating(models.Model):
    nb_stars = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)