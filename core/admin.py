from django.contrib import admin
from .models import Sponsore,Plan,Program,Trainer
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
    list_display = ( 'name', 'surname','classes')