from django.db import models
from user.models import User
from event.models import Event


class Cart(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.JSONField()  # To store a list of event IDs
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def calculate_total_price(self):
        total_price = 0
        events = Event.objects.filter(id__in=self.items)  # Retrieve events based on IDs
        for event in events:
            total_price += event.price
        self.total_price = total_price
        self.save()
