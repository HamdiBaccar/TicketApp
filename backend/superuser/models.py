import logging
from django.db import models
from user.models import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
class SuperUser(User):
    def approve_event(self, event):
        event.status = "approved"
        event.save()
        logger.info("The event created by this user has been successfully approved !")

    def reject_event(self, event):
        event.status = "rejected"
        event.save()
        logger.info("The event created by this user has been rejected.")

    def verify_user(self, user):
        user.is_verified = True
        user.save()
        logger.info("This user has been verified by the admin !")


    def remove_user(self, user):
        user.delete()
        logger.info("The user has been deleted.")
