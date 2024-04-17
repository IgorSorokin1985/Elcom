from rest_framework import generics
from payments.models import Payment
from payments.serializer import PaymentSerializer
from payments.utils import get_url_for_payment


'''Payment'''


class PaymentCreateAPIView(generics.CreateAPIView):
    """ APIView for creating payment """
    serializer_class = PaymentSerializer

    def perform_create(self, serializer):
        new_payment = serializer.save()
        new_payment.url_for_payment = get_url_for_payment(new_payment.order)
        new_payment.save()


class PaymentRetrieveAPIView(generics.RetrieveAPIView):
    """ APIView for sending information about payment """
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
