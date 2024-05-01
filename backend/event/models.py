from django.db import models
from user.models import User

class Event(models.Model):
    CATEGORY_CHOICES = [
        ('movies', 'Movies'),
        ('games', 'Games'),
        ('parties', 'Parties'),
        ('art', 'Art'),
        ('meet', 'Meet'),
        ('music', 'Music'),
        ('education', 'Education'),
    ]

    AGE_CATEGORY_CHOICES = [
        ('child', 'Child (0-12 years)'),
        ('teen', 'Teen (13-19 years)'),
        ('young_adult', 'Young Adult (20-39 years)'),
        ('adult', 'Adult (40-59 years)'),
        ('senior', 'Senior (60+ years)'),
        ('everyone', 'family')
    ]

    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    date = models.DateField()
    launch_time = models.TimeField()
    available_tickets = models.IntegerField()
    ticket_unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('upcoming', 'Upcoming'), ('finished', 'Finished')])
    people_attending = models.ManyToManyField(User, related_name='events_attending', blank=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, null=True, blank=True)
    age_category = models.CharField(max_length=100, choices=AGE_CATEGORY_CHOICES, null=True, blank=True)
    is_approved = models.BooleanField(default=False)

