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
    path('membership_detail/' , membership_detail_view,name="membership_detail"),
    path('blog/' , blog_view,name="blog"),
    path('blog_detail/' , blogdetail_view,name="blogdetail"),
    path('contact/', contact_view,name="contact"),
    path('terms/', tos_view,name="terms"),
    path('trainers/', trainers_view,name="trainers"),
    path('programdetail/', programdetail_view,name="programdetail"),
    path('api/users/', user_data, name='user_data'),
    path('email_verification/', email_verification_view, name='email_verification'),
    path('get-verification-code/', get_verification_code, name='get_verification_code'),
    path('login/', login_view, name='login_view'),
    path('signup/',signup_view, name='signup'),

]
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)