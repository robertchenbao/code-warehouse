# views for the django app

from .models import CodeSnippets, User
from .serializers import CodeSnippetsSerializer, MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework.generics import ListAPIView, CreateAPIView
from django.contrib.postgres.search import SearchVector
from datetime import datetime
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


# log users into the app
class Login(TokenObtainPairView):
    permission_classes = (AllowAny, )
    serializer_class = MyTokenObtainPairSerializer


# register new users
class Register(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer


# get all uses' profiles
class ReadAllProfiles(ListAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = RegisterSerializer


# read current user's own profile
class ReadOwnProfile(APIView):

    def get(self, request):
        serializer = RegisterSerializer(request.user)
        return Response(serializer.data)


# allow users to create a new snippet
class AddCodeSnippet(CreateAPIView):
    # only loggeg-in users can post snippets
    permission_classes = [IsAuthenticated]
    queryset = CodeSnippets.objects.all()
    serializer_class = CodeSnippetsSerializer


# get the latest 10 snippets, at page load
class GetLatestTenSnippets(ListAPIView):
    now_time = datetime.now()
    queryset = CodeSnippets.objects.order_by('pub_date')[:10][::-1]
    serializer_class = CodeSnippetsSerializer


# full-text search for code snippets
class SearchCodeSnippet(ListAPIView):

    serializer_class = CodeSnippetsSerializer

    def get_queryset(self):
        """
        returns a list of all the matched code snippets
        based on the title, category, and content
        """
        queryset = CodeSnippets.objects
        query = self.request.GET.get('keyword')

        # if there is a keyword: return a list of snippets, filtered by the keyword
        if query is not None:
            return queryset.annotate(
                # use "title", "category", "content" to build the search vector
                search=SearchVector("title", "category", "content")).filter(
                    search=query).order_by('-pub_date')[:20]
        # otherwise (no search keyword): return all code snippets
        return queryset.all()
