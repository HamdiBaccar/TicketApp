# Generated by Django 4.1.13 on 2024-05-06 19:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_alter_user_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='cart',
        ),
    ]