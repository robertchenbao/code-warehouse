from rest_framework import serializers
from .models import CodeSnippets, User


class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'username', 'email', 'password')
        model = User


class CodeSnippetsSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'title', 'category', 'content', 'pub_date', 'author')
        model = CodeSnippets
