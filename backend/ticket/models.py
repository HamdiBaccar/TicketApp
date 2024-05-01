from django.db import models
from event.models import Event



class Ticket(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    qr_code = models.CharField(max_length=255)