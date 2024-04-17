from django.urls import path
from payments.views import PaymentCreateAPIView, PaymentRetrieveAPIView
from payments.apps import PaymentsConfig

app_name = PaymentsConfig.name

urlpatterns = [
    path('payment/create/', PaymentCreateAPIView.as_view(), name='payment_create'),
    path('payment/<int:pk>/', PaymentRetrieveAPIView.as_view(), name='payment_details'),
]
