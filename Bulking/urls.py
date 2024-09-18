from django.contrib import admin
from django.urls import path,include
from core.views  import *
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name="home"),
    path('about/' , about_view,name="about"),
    path('membership/' ,membership_view,name="membership"),
    path('membership_detail/<int:plan_id>/', membership_detail_view,name="membership_detail"),
    path('blog/' , blog_view,name="blog"),
    path('blogdetail/<int:blog_id>/', blogdetail_view, name='blogdetail'),
    path('contact/', contact_view,name="contact"),
    path('terms/', tos_view,name="terms"),
    path('trainers/', trainers_view,name="trainers"),
    path('programs/', programs_view,name="programs"),
    path('privacy_policy/', privacy_policy_view,name="privacy_policy"),
    path('payment/<int:plan_id>/<int:months>/', payment_view, name='payment'),
    path('faq/',faq_view,name="faq"),
    path('programdetail/<int:program_id>/', programdetail_view, name='programdetail'),
    path('api/users/', user_data, name='user_data'),
    path('api/cards/', user_cards, name='user_cards'),
    path('email_verification/', email_verification_view, name='email_verification'),
    path('get-verification-code/', get_verification_code, name='get_verification_code'),
    path('login/', login_view, name='login_view'),
    path('login_after_change_password/', login_after_change_password, name='login_after_change_password'),
    path('signup/',signup_view, name='signup'),
    path('password-change/', password_change, name='password_change'),
    path('update-profile-picture/', update_profile_picture, name='update_profile_picture'),
    path('book-class/<int:program_id>/', book_class, name='book_class'),
    path('add_to_wishlist/<int:plan_id>/',add_to_wishlist, name='add_to_wishlist'),
    path('wishlist/', wishlist_view, name='wishlist'),
    path('wishdelete/<int:id>/', wishdelete, name='wishdelete'),
    path('wishlist/purchase/<int:wishlist_id>/<paymethod>/', wishlist_purchase, name='wishlist-purchase'),
    path('purchase/<int:plan_id>/<int:total_amount>/<paymethod>/', purchase, name='purchase'),
    path('wishlistcont/<int:id>/', wishlistcont, name='wishlistcont'),
    path('add-card/', add_card, name='add_card'),
    path('deletecard/',delete_card, name='delete_card'),
    path('send-newsletter/', send_newsletter_message, name='send_newsletter'),
    path('happy_clients/', happy_clients, name='happy_clients'),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)