from users.views import (UserCreateAPIView, UserUpdateAPIView, UserDestroyAPIView, UserRetrieveAPIView,
                         LogCreateAPIView, LogListAPIView, UserCheckByTelegramAPIView)
from users.apps import UsersConfig
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# Описание маршрутизации для ViewSet

app_name = UsersConfig.name

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/create/', UserCreateAPIView.as_view(), name='user_create'),
    path('user/delete/<int:pk>/', UserDestroyAPIView.as_view(), name='user_delete'),
    path('user/update/<int:pk>/', UserUpdateAPIView.as_view(), name='user_update'),
    path('user/<int:pk>/', UserRetrieveAPIView.as_view(), name='user_detail'),
    path('log/create/', LogCreateAPIView.as_view(), name='log_create'),
    path('logs/', LogListAPIView.as_view(), name='logs_list'),
    path('checkuserbytelegram/', UserCheckByTelegramAPIView.as_view(), name='check_user_by_telegram'),
]
