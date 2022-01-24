from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path('read/latest-snippets/', views.GetLatestTenSnippets.as_view()),
    path('read/snippet/', views.SearchCodeSnippet.as_view()),
    path('create/snippet/', views.AddCodeSnippet.as_view()),
    path('register/', views.Register.as_view()),
    path('login/', views.Login.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]