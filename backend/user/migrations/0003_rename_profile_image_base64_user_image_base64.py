# Generated by Django 4.1.13 on 2024-05-03 21:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_profile_image_base64'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='profile_image_base64',
            new_name='image_base64',
        ),
    ]
