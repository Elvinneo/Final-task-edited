from django import template

register = template.Library()

@register.filter
def equalto(value, arg):
    return value == arg