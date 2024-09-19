from django.contrib import admin
from .models import Sponsore, Plan, Profile,Program, Trainer, Card, ContactMessage, Contact, Blog, FAQQuestion, Answer, Social,NewsletterMessage
@admin.register(Sponsore)
class SponsoreAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'icon')
    search_fields = ('name', 'email')
    list_filter = ('name',)

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('price', 'name', 'classes', 'packages', 'tutorials')
    search_fields = ('name', 'price')
    list_filter = ('price', 'name')
    
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'email', 'username', 'program','plan','remaining_days')
    search_fields = ('username', 'plan','program')
    list_filter =('username', 'plan','program')

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'intensity', 'level', 'schedule')
    search_fields = ('name', 'schedule')
    list_filter = ('intensity', 'level')

@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'position')
    search_fields = ('name', 'surname', 'position')
    list_filter = ('position',)

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('address', 'email', 'phone')
    search_fields = ('address', 'email', 'phone')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'title', 'message')
    search_fields = ('full_name', 'email', 'title')
    list_filter = ('title',)
    readonly_fields = ('full_name', 'email', 'phone', 'title', 'message')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'media', 'category', 'created_at')
    search_fields = ('title', 'category', 'created_at')
    list_filter = ('category',)

@admin.register(FAQQuestion)
class FAQQuestionAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'message', 'count', 'created_at')
    search_fields = ('full_name', 'email', 'message')
    list_filter = ('count',)

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer_text', 'created_at')
    search_fields = ('question__full_name', 'answer_text')
    list_filter = ('created_at',)

@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    list_display = ('name', 'address')
    search_fields = ('name', 'address')

@admin.register(NewsletterMessage)
class NewsletteMessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'email','subject','ishappy')
    search_fields = ('user', 'email','subject','ishappy')
    
@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = ('user', 'cardholder','card_number','expiration_date','cvv')
    search_fields = ('user', 'cardholder','card_number')
