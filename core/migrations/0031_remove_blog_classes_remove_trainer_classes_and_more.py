# Generated by Django 5.1 on 2024-08-29 05:51

import ckeditor.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0030_blog'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blog',
            name='classes',
        ),
        migrations.RemoveField(
            model_name='trainer',
            name='classes',
        ),
        migrations.AddField(
            model_name='blog',
            name='author',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='core.trainer'),
        ),
        migrations.AddField(
            model_name='blog',
            name='category',
            field=models.CharField(default='1', max_length=100, verbose_name='Mövzu'),
        ),
        migrations.AddField(
            model_name='trainer',
            name='position',
            field=models.CharField(default='1', max_length=100, verbose_name='Vəzifəsi'),
        ),
        migrations.AlterField(
            model_name='blog',
            name='contents',
            field=ckeditor.fields.RichTextField(max_length=300, verbose_name='Proqram açıqlaması'),
        ),
    ]
