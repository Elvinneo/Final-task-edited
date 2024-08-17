from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.core.cache import cache
from .models import Profile
from django.http import JsonResponse
from django.core.mail import send_mail
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
import random
import string
import logging



def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))


def send_verification_email(email, code):
    subject = 'Your Verification Code'
    message = f'Your verification code is {code}.'
    from_email = 'elvinbagirov@windowslive.com'
    try:
        mail_sent = send_mail(subject, message, from_email, [email])
        return mail_sent > 0
    except Exception as e:
        print(f'Error sending email: {e}')
        return False

@csrf_exempt
def email_verification_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        form_id = request.POST.get('form_id')
        if form_id and email:
            if email:
                code = generate_verification_code()
                request.session['verification_code'] = code
                if send_verification_email(email, code):
                    return JsonResponse({'message': 'A verification code has been sent to your email.'})
                else:
                    return JsonResponse({'message': 'Failed to send verification code. Please try again.'}, status=500)
            else:
                return JsonResponse({'message': 'Please enter a valid email address.'}, status=400)
        else:
            return JsonResponse({'message': 'Invalid form submission.'}, status=400)
    return JsonResponse({'message': 'Invalid request method.'}, status=405)


def get_verification_code(request):
    response = JsonResponse({'verification_code': request.session.get('verification_code')})
    response['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    return response
    
def user_data(request):
    users = Profile.objects.all()
    user_data = []
    for user in users:
        user_data.append({
            'id': user.id,
            'email': user.email,
            'phone': user.phone_number,
            'username': user.username,
        })
    
    return JsonResponse(user_data, safe=False)
logger = logging.getLogger(__name__)

@require_POST
def login_view(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(f'Username: {username}')
    print(f'Password: {password}')
    
    
PREDEFINED_USERNAME = 'ElvinBagirov'
PREDEFINED_PASSWORD = '0844045'

def user_auth(request):
    if request.method == 'POST':
        form_id = request.POST.get('form_id')
        action = request.POST.get('action')
        if form_id == 'securitypasswordform':
            user = authenticate(username=PREDEFINED_USERNAME, password=PREDEFINED_PASSWORD)
            if user is not None:
                login(request, user)
            else:
                logger.error("Giriş bilgileri geçersiz.")
        elif action == 'logout':
            logout(request)
    else:
        form = AuthenticationForm()

def home_view(request):
    user_auth(request)
    return render(request,'home.html')

def about_view(request):
    user_auth(request)
    return render(request,'about.html')

def blog_view(request):
    user_auth(request)
    return render(request,'blog.html')

def membership_view(request):
    user_auth(request)
    return render(request,'membership.html')

def membership_detail_view(request):
    user_auth(request)
    return render(request,'membership_detail.html')

def blogdetail_view(request):
    user_auth(request)
    return render(request,'blogdetail.html')

def overlays_view(request):
    user_auth(request)
    return render(request,'overlays.html')

def contact_view(request):
    user_auth(request)
    return render(request,'contact.html')

def tos_view(request):
    user_auth(request)
    return render(request,'tos.html')


def trainers_view(request):
    user_auth(request)
    return render(request,'trainers.html')

def programdetail_view(request):
    user_auth(request)
    return render(request,'programdetail.html')

