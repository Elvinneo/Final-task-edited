# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile

@receiver(post_save, sender=User)
def create_or_save_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance,
            phone_number='',  
            email=instance.email,  
            username=instance.username, 
            profile_picture=None, 
            program=None,   
            plan=None        
        )
    else:
        if hasattr(instance, 'profile'):
            profile = instance.profile
            print(f"Updating profile for existing user: {instance.username}")
            profile.email = instance.email
            profile.username = instance.username
            profile.save()
        else:
            Profile.objects.create(
                user=instance,
                phone_number='',  
                email=instance.email,
                username=instance.username,
                profile_picture=None, 
                program=None,    
                plan=None   
            )
