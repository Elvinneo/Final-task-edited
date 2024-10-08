# Generated by Django 5.1 on 2024-09-11 03:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0050_newslettermessage_first_name_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newslettermessage',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='newslettermessage',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='newslettermessage',
            name='username',
        ),
        migrations.AddField(
            model_name='newslettermessage',
            name='user',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
