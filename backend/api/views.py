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


class SearchCodeSnippet(ListAPIView):

    serializer_class = CodeSnippetsSerializer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        # title = self.request.title
        # return CodeSnippets.objects.filter(title=title)
        queryset = CodeSnippets.objects.all()
        title = self.request.query_params.get('title')
        if title is not None:
            queryset = queryset.filter(title=title)
        return queryset
