from django.db import models
from django.contrib.auth.models import User
import random
from django.utils import timezone
from ckeditor.fields import RichTextField

class Plan(models.Model):
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00,verbose_name='Plan dəyəri')
    name = models.CharField(max_length=100,verbose_name='Plan adı')
    classes = models.CharField(max_length=100,verbose_name='Daxil olan sinif sayı')
    packages = models.CharField(max_length=100,verbose_name='Daxil olanlar')
    tutorials=models.CharField(max_length=100,verbose_name='Qaynaqlar')
    content=RichTextField(max_length=500,verbose_name='Məlumat',default='')
    about=RichTextField(max_length=1000,verbose_name='Haqqında',default='')
    istheright=RichTextField(max_length=1000,verbose_name='Niye bu plan?',default='')
    
class Program(models.Model):
    name = models.CharField(max_length=100,verbose_name='Program adı')
    explanation = RichTextField(max_length=100,verbose_name='Proqram açıqlaması')
    icon = models.FileField(verbose_name="Program ikonu")
    video=models.FileField(upload_to='Program_videos/')
    question1=models.CharField(max_length=100,verbose_name='Sual1')
    answer1=RichTextField(max_length=500,verbose_name='Cavab1')
    question2=models.CharField(max_length=100,verbose_name='Sual2')
    answer2=RichTextField(max_length=500,verbose_name='Cavab2')
    question3=models.CharField(max_length=100,verbose_name='Sual3')
    answer3=RichTextField(max_length=500,verbose_name='Cavab3')
    duration=models.CharField(max_length=100,verbose_name='Müddət')
    intensity=models.CharField(max_length=100,verbose_name='İntensivlik')
    level=models.CharField(max_length=100,verbose_name='Səviyyəsiz')
    schedule=models.CharField(max_length=100,verbose_name='Planlama')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    username = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    program = models.ForeignKey(Program, on_delete=models.SET_NULL, null=True, blank=True, related_name='profiles')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, blank=True, related_name='profiles')

    def get_plan_name(self):
        return self.plan.name if self.plan else "No Plan"
    
    def get_program_name(self):
        return self.program.name if self.program else "No Program"
    
    def __str__(self):
        return self.user.username

class EmailVerification(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    verification_code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_code(self):
        self.verification_code = ''.join(random.choices('0123456789', k=6))
        self.save()

    def __str__(self):
        return f"{self.user.username} - {self.verification_code}"

class PasswordResetCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    expired_at = models.DateTimeField()
    def is_valid(self):
        return timezone.now() <= self.expired_at

class Sponsore(models.Model):
    name = models.CharField(max_length=100,verbose_name="Sponsor adı")
    email = models.EmailField(max_length=100,verbose_name="Email")
    icon = models.ImageField(verbose_name='Sponsor ikonu')

class Member(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE)
    programs = models.ManyToManyField(Program)
    plans = models.OneToOneField(Plan,on_delete=models.CASCADE)
    ishappy=models.BooleanField(default=False)
    
class Trainer(models.Model):
    name = models.CharField(max_length=100,verbose_name='Adı')
    surname = models.CharField(max_length=100,verbose_name='Soyadı')
    photo=models.FileField()
    email = models.EmailField(max_length=100,verbose_name='Email')
    phone = models.CharField(max_length=20,verbose_name='Telefon')
    position=models.CharField(max_length=100,verbose_name='Vəzifəsi',default='')
    facebook=models.CharField(max_length=100,verbose_name='Facebook')
    linkedin=models.CharField(max_length=100,verbose_name='Linkedin')
    twitter=models.CharField(max_length=100,verbose_name='twitter')
    
class ContactMessage(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return f"{self.full_name} - {self.title}"

class Contact(models.Model):
    phone = models.CharField(max_length=20,verbose_name='Telefon')
    email = models.EmailField(max_length=100,verbose_name='Email')
    address  = models.CharField(max_length=100,verbose_name='Ünvan')
    
class Blog(models.Model):
    title = models.CharField(max_length=100,verbose_name='Başlıq')
    contents = RichTextField(max_length=1800,verbose_name='Proqram açıqlaması')
    media  = models.ImageField(upload_to='blog',verbose_name='Media')
    created_at = models.DateTimeField(auto_now_add=True,verbose_name='Yaradılma tarixi')
    category = models.CharField(max_length=100,verbose_name='Mövzu',default='')
    author = models.ForeignKey(Trainer,on_delete=models.CASCADE,default='')
    @property
    def author_name(self):
        return self.author.name  + ' ' + self.author.surname
    @property
    def author_position(self):
        return self.author.position

   
    


    