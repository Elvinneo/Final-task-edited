from django.shortcuts import render, redirect,get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.http import JsonResponse, HttpResponseForbidden,HttpResponse
from django.core.cache import cache
from .models import *
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import random
import string
import json
from django.contrib.auth.models import User
from .forms import SignupForm,ContactMessageForm,ProfilePictureForm,FAQForm,NewsletterMessageForm
from django.contrib.auth.forms import SetPasswordForm,AuthenticationForm
from django.conf import settings
import re
from .serializers import WishlistSerializer



def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = User.objects.create_user(username=username, email=email, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = SignupForm()
    return render(request, 'home.html', {'form': form})

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
                    return JsonResponse({'status': 'success','message': 'A verification code has been sent to your email.'})
                else:
                    return JsonResponse({'status': 'error','message': 'Failed to send verification code. Please try again.'}, status=500)
            else:
                return JsonResponse({'status': 'error','message': 'Please enter a valid email address.'}, status=400)
        else:
            return JsonResponse({'status': 'error','message': 'Invalid form submission.'}, status=400)
    return JsonResponse({'status': 'error','message': 'Invalid request method.'}, status=405)


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
            return JsonResponse({'status': 'error','message': 'Unauthorized access.'}, status=403)
    return JsonResponse({'status': 'error','message': 'Invalid request method.'}, status=405)

def user_data(request):
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

def user_cards(request):
    token = request.headers.get('Authorization', '').split(' ')[-1]
    if token != 'bvmVNBMBMHB24512vbnmmm45vbgfhvn53VGBHJbjghj275fgcgvnf':
        return HttpResponseForbidden('Unauthorized')
    user_id = request.user.id
    cards = Card.objects.filter(user_id=user_id)
    user_card = []
    for card in cards:
        user_card.append({
            'id': card.id,
            'card_number':card.card_number,
            'cardholder': card.cardholder,
            'cvv': card.cvv,
            'expiry':card.expiration_date,
            'postal':card.postal
        })
    return JsonResponse(user_card, safe=False)

username_global = None
password_global = None

@csrf_exempt
def login_view(request):
    global username_global
    global password_global
    if request.method == 'POST':
        username_global = request.POST.get('username')
        password_global = request.POST.get('password')
    return render(request,request.path)

def user_auth(request):
    if request.method == 'POST':
        form_id = request.POST.get('form_id')
        action = request.POST.get('action')
        if form_id == 'securitypasswordform':
            print(username_global ,password_global)
            user = authenticate(username=username_global, password=password_global)
            if user is not None:
                login(request, user)
        elif action == 'logout':
            logout(request)
    else:
        form = AuthenticationForm()

@csrf_exempt
def password_change(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_password1 = data.get('new_password1')
            new_password2 = data.get('new_password2')
            email = data.get('email')
            if new_password1 and new_password2 and new_password1 == new_password2:
                user = User.objects.filter(email=email).first()
                if user:
                    form = SetPasswordForm(user, {'new_password1': new_password1, 'new_password2': new_password2})
                    if form.is_valid():
                        form.save()
                        return JsonResponse({'status': 'success', 'message': 'Password reset successful.'})
                    else:
                        return JsonResponse({'status': 'error', 'message': 'Invalid password.'}, status=400)
                return JsonResponse({'status': 'error', 'message': 'User not found.'}, status=400)
            return JsonResponse({'status': 'error', 'message': 'Passwords do not match.'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON.'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

@login_required
def update_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            new_picture_url = request.user.profile.profile_picture.url
            return JsonResponse({'success': True, 'new_picture_url': new_picture_url})
        else:
            return JsonResponse({'success': False, 'error': 'Form is not valid'})
    return JsonResponse({'success': False, 'error': 'Invalid request'})

def book_class(request, program_id):
    program = get_object_or_404(Program, id=program_id)
    user_profile, created = Profile.objects.get_or_create(user=request.user)
    if user_profile.program and user_profile.program.id == program.id:
        request.session['error_message'] = 'This program has already been selected.'
        return redirect('programdetail',program_id=program_id)
    user_profile.program = program
    user_profile.save()
    request.session['success_message'] = 'Membership successfully updated!'
    return redirect('programdetail',program_id=program_id)

def home_view(request):
    sponsores=Sponsore.objects.all()
    plans=Plan.objects.all()
    programs=Program.objects.all()
    user_auth(request)
    context = {
        'sponsores': sponsores,
        'plans': plans,
        'programs': programs,}
    return render(request,'home.html',context)

def about_view(request):
    user_auth(request)
    return render(request,'about.html')

def blog_view(request):
    lastblog = Blog.objects.last()
    blogs = Blog.objects.all()
    if blogs.exists():
        last_blog_id = blogs.last().id
    else:
        last_blog_id = None

    context = {
        'lastblog': lastblog,
        'blogs': blogs,
        'last_blog_id': last_blog_id
    }
    return render(request, 'blog.html', context)

def membership_view(request):
    user_auth(request)
    plans=Plan.objects.all()
    return render(request,'membership.html',{'plans':plans})

def membership_detail_view(request,plan_id):
    user_auth(request)
    plan = get_object_or_404(Plan, id=plan_id)
    return render(request,'membership_detail.html',{'plan': plan})

def blogdetail_view(request, blog_id):
    user_auth(request)
    trainers = Trainer.objects.all()
    blog = get_object_or_404(Blog, id=blog_id)
    blogs = Blog.objects.all().order_by('-created_at')[:3]
    content = blog.contents
    words = content.split()
    first_part = ' '.join(words[:47])
    second_part = ' '.join(words[47:])
    fitness_blogs = Blog.objects.filter(category='Fitness').order_by('-created_at')[:3]
    health_blogs = Blog.objects.filter(category='Health').order_by('-created_at')[:3]
    recipes_blogs = Blog.objects.filter(category='Recipes').order_by('-created_at')[:3]

    context = {
        'trainers': trainers,
        'blog': blog,
        'blogs': blogs,
        'first_part': first_part,
        'second_part': second_part,
        'fitness_blogs': fitness_blogs,
        'health_blogs': health_blogs,
        'recipes_blogs': recipes_blogs,
    }
    return render(request, 'blogdetail.html', context)


def contact_view(request):
    user_auth(request)
    contacts = Contact.objects.get()
    if request.method == 'POST':
        form_id = request.POST.get('form_id')
        if form_id == 'contactform': 
            form = ContactMessageForm(request.POST)
            if form.is_valid():
                form.save()
                response = {'success': True, 'message': 'Your message has been sent successfully!'}
            else:
                errors = form.errors.as_json()
                response = {'success': False, 'errors': errors}
            return JsonResponse(response) 
    return render(request, 'contact.html', {'contact': contacts})


def tos_view(request):
    user_auth(request)
    return render(request,'tos.html')

def trainers_view(request):
    trainers=Trainer.objects.all()
    user_auth(request)
    return render(request,'trainers.html',{'trainers':trainers})

def programs_view(request):
    user_auth(request)
    programs=Program.objects.all()
    faqs = FAQQuestion.objects.prefetch_related('answers').all()
    seen_messages = set()
    unique_faqs = []
    for faq in faqs:
        if faq.message not in seen_messages:
            seen_messages.add(faq.message)
            unique_faqs.append(faq)
    context={'programs':programs,
             'faqs':unique_faqs}
    return render(request,'programs.html',context)

def programdetail_view(request, program_id):
    user_auth(request)
    program = get_object_or_404(Program, id=program_id)
    return render(request, 'programdetail.html', {'program': program})

def privacy_policy_view(request):
    user_auth(request)
    return render(request, 'privacy_policy.html')

def faq_view(request):
    user_auth(request)
    faqs = FAQQuestion.objects.prefetch_related('answers').all()
    seen_messages = set()
    unique_faqs = []

    for faq in faqs:
        if faq.message not in seen_messages:
            seen_messages.add(faq.message)
            unique_faqs.append(faq)
    if request.method == 'POST':
        form_id = request.POST.get('form_id')
        if form_id == 'faqform': 
            form = FAQForm(request.POST)
            if form.is_valid():
                full_name = form.cleaned_data['full_name']
                email = form.cleaned_data['email']
                message = form.cleaned_data['message']
                message = message.lower().strip()
                normalized_message = re.sub(r'\W+', ' ', message)
                faq, created = FAQQuestion.objects.get_or_create(
                    email=email,
                    normalized_message=normalized_message,
                    defaults={'full_name': full_name}
                )
                if not created:
                    faq.count += 1
                    faq.save()
                return JsonResponse({'status': 'success', 'message': 'Your question has been submitted successfully.'})
            return JsonResponse({'status': 'error', 'message': 'There was an error with your submission.'})
    return render(request, 'FAQ.html', {'faqs': unique_faqs})

def add_to_wishlist(request, plan_id):
    plan = get_object_or_404(Plan, id=plan_id)
    try:
        data = json.loads(request.body)
        months = int(data.get('months'))
        if months <= 0:
            raise ValueError
    except (ValueError, TypeError, KeyError):
        return JsonResponse({'status': 'error', 'message': 'Invalid data.'}, status=400)
    wishlist_item, created = Wishlist.objects.get_or_create(
        user=request.user,
        plan=plan,
        defaults={'months': months}
    )
    if not created:
        wishlist_item.months = months
        wishlist_item.save()
    
    return JsonResponse({'status': 'success', 'message': 'Plan added to wishlist with amount.'})

@login_required
def wishlist_view(request):
    wishlist_items = Wishlist.objects.filter(user=request.user)
    serializer = WishlistSerializer(wishlist_items, many=True)
    return JsonResponse({'status': 'success', 'wishlist_items': serializer.data})


def wishdelete(request,id):
    item=Wishlist.objects.get(id=id)
    item.delete()
    return JsonResponse({'status': 'success', 'message': 'Plan deleted on the wishlist'})

def payment_view(request, plan_id, months):
    user_auth(request)
    user=request.user
    plan = get_object_or_404(Plan, id=plan_id)
    cards = Card.objects.filter(user_id=user.id)
    print(cards)
    total=plan.price * months
    context = {
        'id':plan_id,
        'plan_name': plan.name,
        'price': plan.price,
        'classes': plan.classes,
        'packages': plan.packages,
        'tutorials': plan.tutorials,
        'content': plan.content,
        'about': plan.about,
        'istheright': plan.istheright,
        'months': months,
        'total' :total,
        'cards':cards,
 
    }
    return render(request, 'payment.html', context)


def purchase(request, plan_id,total_amount,paymethod):
    if request.method == 'POST':
        user = request.user
        plan = get_object_or_404(Plan, id=plan_id)
        user_profile, created = Profile.objects.get_or_create(user=user)
        if user_profile.plan and user_profile.plan.id == plan_id:
            return JsonResponse({'status': 'info', 'message': 'This plan was already purchased.', 'remaining_days': user_profile.remaining_days})
        user_profile.plan = plan
        user_profile.update_remaining_days()
        user_profile.save()
        request.session['success_message'] = 'Membership successfully updated!'
        payment = Payment(
            user=user,
            plan=plan,
            amount=total_amount,
            method=paymethod
        )
        payment.save()
        return JsonResponse({'status': 'success', 'message': 'Payment successfully '})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)



def wishlist_purchase(request, wishlist_id, paymethod):
    if request.method == 'POST':
        user = request.user
        wishlist_item = get_object_or_404(Wishlist, id=wishlist_id, user=user)
        plan_id = wishlist_item.plan_id
        plan = get_object_or_404(Plan, id=plan_id)
        user_profile, created = Profile.objects.get_or_create(user=user)
        if user_profile.plan and user_profile.plan.id == plan_id:
            return JsonResponse({'status': 'info', 'message': 'This plan was already purchased.','remaining_days': user_profile.remaining_days})
        user_profile.plan = plan
        user_profile.update_remaining_days()
        user_profile.save()
        payment = Payment(
            user=user,
            plan=plan,
            amount=wishlist_item.amount,
            method=paymethod
        )
        payment.save()
        wishlist_item.delete()
        
        return JsonResponse({'status': 'success', 'message': 'Payment successfully, item removed from wishlist.'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


def wishlistcont(request, id):
    try:
        wishlist = Wishlist.objects.get(id=id)
        data = {
            'user': wishlist.user.id,
            'plan': wishlist.plan.id,
            'added_at': wishlist.added_at.isoformat(),
            'amount': str(wishlist.amount),
            'months': wishlist.months
        }
        return JsonResponse(data)
    except Wishlist.DoesNotExist:
        return JsonResponse({ 'status': 'error','message': 'Wishlist not found'}, status=404)
    
    
    
@login_required
def delete_card(request):
    if request.method == 'POST':
        card_number = request.POST.get('card_number')
        card = get_object_or_404(Card, card_number=card_number, user=request.user)
        card.delete()
        return JsonResponse({'status': 'success', 'message': 'Your card has been deleted.'})
    return JsonResponse({'status': 'error', 'message': 'Card is not deleted'}, status=404)



@login_required
@require_POST
def add_card(request):
    try:
        data = json.loads(request.body)
        user = request.user
        cardholder = data.get('cardholder')
        card_number = data.get('card_number')
        expiration_date = data.get('expiration_date')  # Önemli: JSON'daki isimle uyumlu olmalı
        cvv = data.get('cvv')
        postal = data.get('postal')

        if all([user, cardholder, card_number, expiration_date, cvv, postal]):
            card = Card(
                user=user,
                cardholder=cardholder,
                card_number=card_number,
                expiration_date=expiration_date,
                cvv=cvv,
                postal=postal
            )
            card.save()
            return JsonResponse({'status': 'success'})
        else:
            return JsonResponse({'status': 'error', 'message': 'All fields are required'})
    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'})

def send_newsletter_message(request):
    if request.method == 'POST':
        message_text = request.POST.get('message')
        if message_text:
            username=request.user.username
            message_instance = NewsletterMessage(
                name=username,
                email=Profile.objects.get(user=request.user).email,
                subject='Newsletter Message',
                message=message_text
            )
            message_instance.save()
            try:
                to_email = Contact.objects.first().email 
                from_email = Profile.objects.get(user=request.user).email
                subject = 'Newsletter Message'
                message = f"From: {from_email}\n\n{message_text}"
                send_mail(subject, message, from_email, [to_email])
                response_data = {'success': True, 'message': 'Your message has been sent successfully!'}
            except Exception as e:
                response_data = {'success': False, 'message': str(e)}
            return JsonResponse(response_data)
    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)




def HappyClients(request):
    ishappy = NewsletterMessage.objects.get(ishappy)
    profile_picture=Profile.objects.
    clients={
        "username":
    }
    return render(request, 'happy_clients.html',{"clients": clients})