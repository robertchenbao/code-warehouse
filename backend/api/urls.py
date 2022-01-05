from django.urls import path

from . import views

urlpatterns = [
    path('view/', views.AddCodeSnippets.as_view()),
    path('create/', views.GetCodeSnippets.as_view()),
]