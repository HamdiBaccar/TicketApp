from django.db import models
from django.contrib.auth.hashers import make_password
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model

class User(models.Model):
    username = models.CharField(max_length=150, unique=True,default="")
    password = models.CharField(max_length=128, default="")
    age = models.PositiveIntegerField(null=True)
    field_of_interest = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=20, null=True)
    email = models.EmailField(unique=True)
    governorate = models.CharField(max_length=100, null=True)
    is_verified = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    cart = models.JSONField(default=list)
    # tickets = models.JSONField()  |||
    #MFA fields
    mfa_enabled = models.BooleanField(default=False) 
    mfa_secret_key = models.CharField(max_length=100, null=True)
    image_base64 = models.TextField(null=True, blank=True)
    bookedEvents = models.JSONField(default=dict)  
    hostedEvents = models.JSONField(default=dict)  
    tickets = models.JSONField(default=dict) 

    @property
    def profile_image_data_uri(self):
        # Generate data URI for displaying the profile image
        if self.image_base64:
            return f"data:image/png;base64,{self.image_base64}"
        return None

    def save(self, *args, **kwargs):
        # Hash the password before saving
        if self.password:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def get_user_from_token(token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']  # Assuming 'user_id' is stored in the token
            User = get_user_model()
            user = User.objects.get(id=user_id)
            return user
        except (jwt.DecodeError, jwt.ExpiredSignatureError, KeyError, User.DoesNotExist):
            return None
