from event.models import Event
from django.db import models
from user.models import User

class Feedback(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    feedback_text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    publish_time = models.TimeField(auto_now_add=True)
    publish_date = models.DateField(auto_now_add=True)