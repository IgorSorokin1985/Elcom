from rest_framework.permissions import BasePermission
from users.models import User
from users.utils import get_user_by_telegram


class IsTelegramUser (BasePermission):
    """ Permission for checking telegram chart id user """
    def has_permission(self, request, view):
        if 'chartID' in request.headers:
            telegram_chat_id = request.headers["chartID"]
            result = User.objects.all().filter(telegram_chat_id=telegram_chat_id)
            if result:
                return True
            else:
                return False
        else:
            return False


class IsOwner(BasePermission):
    """ Permission for checking owner """
    message = "You are not owner"

    def has_object_permission(self, request, view, obj):
        if 'chartID' in request.headers:
            user = get_user_by_telegram(request)
        else:
            user = request.user
        return user == obj.user
