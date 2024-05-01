# Generated by Django 4.1.13 on 2024-05-01 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='image_base64',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='status',
            field=models.CharField(choices=[('upcoming', 'Upcoming'), ('finished', 'Finished')], default='upcoming', max_length=20),
        ),
    ]