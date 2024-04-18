from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from users.serializers import UserSerializer, LogSerializer
from users.models import User, Log
from orders.models import Order
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class UserCreateAPIView(generics.CreateAPIView):
    """Creating new user"""
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        new_user = serializer.save()
        password = serializer.data["password"]
        new_user.set_password(password)
        new_user.save()
        data = {
            "user": new_user,
        }
        new_order = Order.objects.create(**data)
        new_order.save()


class UserUpdateAPIView(generics.UpdateAPIView):
    """Updating user"""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        new_user = serializer.save()
        password = serializer.data["password"]
        new_user.set_password(password)
        new_user.save()


class UserDestroyAPIView(generics.DestroyAPIView):
    """Deleting user"""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]


class UserRetrieveAPIView(generics.RetrieveAPIView):
    """Viewing user"""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]


class LogCreateAPIView(generics.CreateAPIView):
    """ APIView for creating log """
    serializer_class = LogSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        new_log = serializer.save()
        new_log.user = self.request.user
        new_log.save()


class LogListAPIView(generics.ListAPIView):
    """ APIVIew for sending all logs """
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    permission_classes = [IsAuthenticated]


class LogRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
    permission_classes = [IsAuthenticated]


class UserCheckByTelegramAPIView(APIView):

    def get(self, *args, **kwargs):
        if 'chartID' in self.request.headers:
            telegram_chat_id = self.request.headers["chartID"]
            result = User.objects.all().filter(telegram_chat_id=telegram_chat_id)
            if result:
                return Response({"answer": True})
            else:
                return Response({"answer": False})
        else:
            return Response({"answer": False})
