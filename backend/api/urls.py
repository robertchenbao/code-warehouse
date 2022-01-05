from django.urls import path

from . import views

urlpatterns = [
    path('read/snippets/', views.GetCodeSnippets.as_view()),
    path('create/snippet/', views.AddCodeSnippet.as_view()),
    path('read/users/', views.GetUsers.as_view()),
    path('create/user/', views.AddUser.as_view()),
]