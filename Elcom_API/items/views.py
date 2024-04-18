from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from items.models import Item, Category
from users.models import Log
from items.serializer import ItemSerializer, CategorySerializer
from users.permissions import IsTelegramUser
from users.utils import get_user_by_telegram


class ItemsListAPIView(generics.ListAPIView):
    """ APIView for sending all items """
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class ItemsRetrieveAPIView(generics.RetrieveAPIView):
    """ APIView for sending current item """
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    permission_classes = [IsAuthenticated | IsTelegramUser]

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object())
        if "chartID" in self.request.headers:
            user = get_user_by_telegram(request)
        else:
            user = self.request.user
        item = self.get_object()
        new_log_data = {
            "user": user,
            "action": f"Saw {item}."
        }
        new_log = Log.objects.create(**new_log_data)
        new_log.save()
        return Response(serializer.data)


class CategoriesListAPIView(generics.ListAPIView):
    """ APIView for sending all categories """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
