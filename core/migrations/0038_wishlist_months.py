# Generated by Django 5.1 on 2024-09-01 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0037_wishlist_amount_alter_wishlist_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='wishlist',
            name='months',
            field=models.PositiveIntegerField(default=1, verbose_name='Months'),
        ),
    ]
