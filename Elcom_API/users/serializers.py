from rest_framework import serializers
from users.models import User, Log


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User Model"""

    class Meta:
        model = User
        fields = "__all__"


class LogSerializer(serializers.ModelSerializer):
    """Serializer for Log Model"""
    class Meta:
        model = Log
        fields = "__all__"
