from django.core.management.base import BaseCommand
from core.models import Profile

class Command(BaseCommand):
    help = 'Update remaining days for all profiles'
    def handle(self, *args, **kwargs):
        profiles = Profile.objects.all()
        for profile in profiles:
            profile.update_remaining_days()
            self.stdout.write(self.style.SUCCESS(f'Successfully updated remaining days for {profile.user.username}'))