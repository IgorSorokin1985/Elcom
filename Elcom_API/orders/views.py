from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from orders.models import Order, Position
from orders.serializer import OrderSerializer, PositionSerializer
from payments.models import Payment
from users.models import Log
from items.models import Item
from payments.utils import get_url_for_payment, create_invoice_pdf
from orders.utils import get_summa_order, send_email, create_message_for_email
from users.utils import get_user_by_telegram
from users.permissions import IsTelegramUser, IsOwner


'''Order'''


class OrderListAPIView(generics.ListAPIView):
    """ APIView for sending information about orders """
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated | IsTelegramUser]

    def get_queryset(self):
        list_orders = super().get_queryset()
        if 'chartID' in self.request.headers:
            user = get_user_by_telegram(self.request)
        else:
            user = self.request.user
        return list_orders.filter(user=user).filter(status="R")


class OrderRetrieveAPIView(generics.RetrieveAPIView):
    """ APIView for sending information about one order """
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated | IsTelegramUser, IsOwner]


class OrderUpdateAPIView(generics.UpdateAPIView):
    """ APIView for updating order """
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated | IsTelegramUser, IsOwner]

    def perform_update(self, serializer):
        if 'chartID' in self.request.headers:
            user = get_user_by_telegram(self.request)
        else:
            user = self.request.user
        updated_order = serializer.save()
        if updated_order.status == "R":
            data = {
                "user": user,
            }
            new_order = Order.objects.create(**data)
            new_order.save()

            order = serializer.instance
            output_filename = create_invoice_pdf(order)
            if get_summa_order(order) < 999999:
                url_for_payment = get_url_for_payment(order)
            else:
                url_for_payment = False
            new_payment_data = {
                "order": order,
                "url_for_payment": url_for_payment,
                "invoice": output_filename
            }
            new_payment = Payment.objects.create(**new_payment_data)
            new_payment.save()
            message = create_message_for_email(order.user, url_for_payment, output_filename)
            send_email(f"Order {order} from {order.data}", message, order.user)
        new_log_data = {
            "user": user,
            "action": f"Changed status of order {updated_order.id} from {updated_order.data}."
        }
        new_log = Log.objects.create(**new_log_data)
        new_log.save()
        updated_order.save()


class GetLastOrderByUser(APIView):
    """APIView for sending information about user - his last order (Cart) and user ID """
    permission_classes = [IsAuthenticated | IsTelegramUser]

    def get(self, *args, **kwargs):
        if 'chartID' in self.request.headers:
            user = get_user_by_telegram(self.request)
        else:
            user = self.request.user
        order = Order.objects.filter(user=user).last()
        if order:
            return Response({"order_id": order.pk,
                             "user_id": user.pk})
        else:
            data = {
                "user": user,
            }
            new_order = Order.objects.create(**data)
            new_order.save()
            return Response({"order_id": new_order.pk,
                             "user_id": user.pk})


'''Position'''


class PositionListAPIView(generics.ListAPIView):
    """ APIView for sending all position """
    serializer_class = PositionSerializer
    queryset = Position.objects.all()
    permission_classes = [IsAuthenticated]


class PositionRetrieveAPIView(generics.RetrieveAPIView):
    """ APIView for sending information about one position """
    serializer_class = PositionSerializer
    queryset = Position.objects.all()
    permission_classes = [IsAuthenticated]


class PositionUpdateAPIView(generics.UpdateAPIView):
    """ APIView for updating position """
    serializer_class = PositionSerializer
    queryset = Position.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        position = serializer.save()
        item = position.item
        new_log_data = {
            "user": self.request.user,
            "action": f"Changed quantity {item} on {position.quantity} ."
        }
        new_log = Log.objects.create(**new_log_data)
        new_log.save()
        position.save()


class PositionDestroyAPIView(generics.DestroyAPIView):
    """ APIView for deleting position """
    serializer_class = PositionSerializer
    queryset = Position.objects.all()
    permission_classes = [IsAuthenticated | IsTelegramUser]

    def perform_destroy(self, *args, **kwargs):
        if 'chartID' in self.request.headers:
            user = get_user_by_telegram(self.request)
        else:
            user = self.request.user
        position = self.get_object()
        item = position.item
        new_log_data = {
            "user": user,
            "action": f"Deleted {position.quantity} {item}."
        }
        new_log = Log.objects.create(**new_log_data)
        new_log.save()
        position.delete()


class PositionAddAPIView(APIView):
    """ APIView for creating new position. This View checks whether such a position in this order. If
     there is is one, it adds the quantity to the existing position."""
    permission_classes = [IsAuthenticated | IsTelegramUser]

    def post(self, *args, **kwargs):
        if 'chartID' in self.request.headers:
            user = get_user_by_telegram(self.request)
        else:
            user = self.request.user
        order_id = self.request.data["order"]
        item_id = self.request.data["item"]
        item = Item.objects.get(pk=item_id)
        quantity = int(self.request.data["quantity"])
        price = int(self.request.data["price"])
        positions = Position.objects.filter(order=order_id).filter(item=item_id).all()
        if len(positions) == 0:
            new_position_data = {
                "order_id": order_id,
                "item_id": item_id,
                "quantity": quantity,
                "price": price
            }
            new_position = Position.objects.create(**new_position_data)
            new_position.save()
        else:
            position = positions[0]
            position.quantity += quantity
            position.save()
        new_log_data = {
            "user": user,
            "action": f"Added {quantity}  {item}."
        }
        new_log = Log.objects.create(**new_log_data)
        new_log.save()
        return Response({"message": "ok"})
