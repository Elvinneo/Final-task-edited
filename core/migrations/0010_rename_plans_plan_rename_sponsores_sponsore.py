# Generated by Django 5.1 on 2024-08-25 08:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_plans'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Plans',
            new_name='Plan',
        ),
        migrations.RenameModel(
            old_name='Sponsores',
            new_name='Sponsore',
        ),
    ]
