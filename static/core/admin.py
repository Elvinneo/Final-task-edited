from django.contrib import admin
from .models import Sponsore,Plan,Program,Trainer,ContactMessage,Contact,Blog,FAQQuestion,Answer,Social
admin.site.register


@admin.register(Sponsore)
class SponsoresAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'icon')

@admin.register(Plan)
class PlansAdmin(admin.ModelAdmin):
    list_display = ('price', 'name', 'classes','packages','tutorials')
    
@admin.register(Program)
class ProgramsAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'duration','intensity','level','schedule')
    
@admin.register(Trainer)
class TrainersAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'surname','position')
    
@admin.register(Contact)
class ContactsAdmin(admin.ModelAdmin):
    list_display = ( 'address', 'email','phone')
    
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'phone', 'title', 'message')
    search_fields = ('full_name', 'email', 'title')
    
@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'media', 'category','created_at', )
    search_fields = ('title', 'category', 'created_at')
    
@admin.register(FAQQuestion)
class FAQQuestionAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'message','count','created_at')
    search_fields = ('fullname', 'email', 'message')
    
@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer_text','created_at')
    
@admin.register(Social)
class SocialAdmin(admin.ModelAdmin):
    list_display = ('name','address')
