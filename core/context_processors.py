from .models import Social,NewsletterMessage,Profile
from django.http import JsonResponse

def social_context(request):
    socials = Social.objects.all()
    return {'socials': socials}


