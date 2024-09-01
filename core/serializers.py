    
from rest_framework import serializers
from .models import Wishlist, User, Plan

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'plan', 'added_at', 'amount', 'months']  
    user = serializers.StringRelatedField() 
    plan = serializers.StringRelatedField() 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'name'] 

class WishlistSerializer(serializers.ModelSerializer):
    user = UserSerializer() 
    plan = PlanSerializer()

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'plan', 'added_at', 'amount', 'months']
