# views for the django app

from .models import CodeSnippets, User
from .serializers import CodeSnippetsSerializer, UsersSerializer
from rest_framework.generics import ListAPIView, CreateAPIView


class GetUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class AddUser(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class AddCodeSnippet(CreateAPIView):
    queryset = CodeSnippets.objects.all()
    serializer_class = CodeSnippetsSerializer


class GetCodeSnippets(ListAPIView):
    queryset = CodeSnippets.objects.all()
    serializer_class = CodeSnippetsSerializer