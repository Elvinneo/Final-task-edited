# Generated by Django 5.1 on 2024-09-05 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0040_card'),
    ]

    operations = [
        migrations.CreateModel(
            name='Social',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('facebook', models.CharField(max_length=50, verbose_name='Facebook')),
                ('instagram', models.CharField(max_length=50, verbose_name='Instagram')),
                ('youtube', models.CharField(max_length=50, verbose_name='Youtube')),
                ('linkedin', models.CharField(max_length=50, verbose_name='Facebook')),
                ('twitter', models.CharField(max_length=50, verbose_name='Facebook')),
            ],
        ),
    ]
