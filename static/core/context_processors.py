from .models import Social

def social_context(request):
    socials = Social.objects.all()
    return {'socials': socials}