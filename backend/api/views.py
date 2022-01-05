# views for the django app

from .models import CodeSnippets
from .serializers import CodeSnippetsSerializer
from rest_framework.generics import ListAPIView, CreateAPIView


class AddCodeSnippets(ListAPIView):
    queryset = CodeSnippets.objects.all()
    serializer_class = CodeSnippetsSerializer


class GetCodeSnippets(CreateAPIView):
    queryset = CodeSnippets.objects.all()
    serializer_class = CodeSnippetsSerializer