from django.contrib import admin
from django.urls import path,include
from core.views  import *
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name="home"),
    path('about/' , about_view,name="about"),
    path('membership/' ,membership_view,name="membership"),
    path('membership_detail/' , membership_detail_view,name="membership_detail"),
    path('blog/' , blog_view,name="blog"),
    path('blog_detail/' , blogdetail_view,name="blogdetail"),
    path('overlays/' , overlays_view,name="overlays"),
    path('account/',include('account.urls'),name="account"),
    path('login/', login__view,name="login"),
    path('contact/', contact_view,name="contact"),
    path('terms/', tos_view,name="terms"),
    path('trainers/', trainers_view,name="trainers"),
    path('programdetail/', programdetail_view,name="programdetail"),
]
