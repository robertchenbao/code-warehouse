# views for the django app

from .models import CodeSnippets, User
from .serializers import CodeSnippetsSerializer, UsersSerializer
from rest_framework.generics import ListAPIView, CreateAPIView
from django.contrib.postgres.search import SearchVector
from datetime import datetime


class GetUsers(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class AddUser(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class AddCodeSnippet(CreateAPIView):
    queryset = CodeSnippets.objects.all()
    serializer_class = CodeSnippetsSerializer


class GetLatestTenSnippets(ListAPIView):
    now_time = datetime.now()
    queryset = CodeSnippets.objects.order_by('-pub_date')[:10][::-1]
    serializer_class = CodeSnippetsSerializer


class SearchCodeSnippet(ListAPIView):

    serializer_class = CodeSnippetsSerializer

    def get_queryset(self):
        """
        This view should return a list of all the matched code snippets
        based on the title, category, and content
        """
        queryset = CodeSnippets.objects
        query = self.request.GET.get('keyword')

        # if there is a keyword: return a list of snippets, filtered by the keyword
        if query is not None:
            return queryset.annotate(
                # use "title", "category", "content" to build the search vector
                search=SearchVector("title", "category", "content")).filter(
                    search=query)
        # otherwise (no search keyword): return all code snippets
        return queryset.all()
