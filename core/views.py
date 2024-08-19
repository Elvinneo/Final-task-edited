from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse, HttpResponseForbidden,HttpResponseRedirect
from django.core.cache import cache
from .models import Profile
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import random
import string


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


@csrf_exempt
def get_verification_code(request):
    if request.method == 'GET':
        token = request.headers.get('Authorization')
        if token == 'bvmVNBMBMHB24512vbnmmm45vbgfhvn53VGBHJbjghj275fgcgvnf':
            verification_code = request.session.get('verification_code')
            response = JsonResponse({'verification_code': verification_code})
            response['Cache-Control'] = 'no-store, no-cache, must-revalidate, proxy-revalidate'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            return response
        else:
            return JsonResponse({'message': 'Unauthorized access.'}, status=403)
    return JsonResponse({'message': 'Invalid request method.'}, status=405)


def user_data(request):
    # Token'ı başlıktan çıkarın
    token = request.headers.get('Authorization', '').split(' ')[-1]
    if token != 'bvmVNBMBMHB24512vbnmmm45vbgfhvn53VGBHJbjghj275fgcgvnf':
        return HttpResponseForbidden('Unauthorized')
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


username_global = None
password_global = None

@csrf_exempt
def login_view(request):
    global username_global
    global password_global
    
    if request.method == 'POST':
        username_global = request.POST.get('username')
        password_global = request.POST.get('password')

        return JsonResponse({'success': 'Login saved'})
    return JsonResponse({'error': 'Invalid request'})

def user_auth(request):
    if request.method == 'POST':
        form_id = request.POST.get('form_id')
        action = request.POST.get('action')
        if form_id == 'securitypasswordform':
            print(username_global,password_global)
            user = authenticate(username=username_global, password=password_global)
            if user is not None:
                login(request, user)
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

