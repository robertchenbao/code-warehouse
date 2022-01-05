from rest_framework import serializers
from .models import CodeSnippets


class CodeSnippetsSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'title', 'category', 'content', 'pub_date', 'author')
        model = CodeSnippets