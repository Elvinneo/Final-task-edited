# Generated by Django 5.1 on 2024-08-27 15:16

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0025_alter_plan_about_alter_plan_istheright'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='content',
            field=ckeditor.fields.RichTextField(default='', max_length=500, verbose_name='Məlumat'),
        ),
    ]
