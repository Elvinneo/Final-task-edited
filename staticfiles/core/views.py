from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login

def home_view(request):
    return render(request, 'home.html')

def about_view(request):
    return render(request,'about.html')

def blog_view(request):
    return render(request,'blog.html')

def membership_view(request):
    return render(request,'membership.html')

def membership_detail_view(request):
    return render(request,'membership_detail.html')

def blogdetail_view(request):
    return render(request,'blogdetail.html')


def overlays_view(request):
    return render(request,'overlays.html')

def contact_view(request):
    return render(request,'contact.html')

def tos_view(request):
    return render(request,'tos.html')


def trainers_view(request):
    return render(request,'trainers.html')

def programdetail_view(request):
    return render(request,'programdetail.html')



def login__view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password")
            return redirect('login')

    return render(request, 'login.html')
