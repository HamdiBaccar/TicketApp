from django.core.management.base import BaseCommand
from superuser.models import SuperUser

class Command(BaseCommand):
    help = 'Creates a default superuser account with admin privileges'

    def handle(self, *args, **options):
        # Create the default superuser
        superuser, created = SuperUser.objects.get_or_create(
            email='admin123@example.com',  # Change email to desired value
            defaults={'is_admin': True},  # Set is_admin to True
            password = 'admin123'
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Default superuser created successfully'))
        else:
            self.stdout.write(self.style.WARNING('Default superuser already exists'))
