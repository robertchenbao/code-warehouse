from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from . import views

urlpatterns = [
    path('read/latest-snippets/', views.GetLatestTenSnippets.as_view()),
    path('read/snippet/', views.SearchCodeSnippet.as_view()),
    path('create/snippet/', views.AddCodeSnippet.as_view()),
    path('register/', views.Register.as_view()),
    # login/ endpoint: obtain the JWT token (requiring username and password)
    path('login/', views.Login.as_view(), name='token_obtain_pair'),
    # login/refresh/ endpoint: refresh the token (after it is expired)
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # verify the token (will return 200 OK if form.token is valid)
    path('login/verify/', TokenVerifyView.as_view(), name='token_verify'),
]