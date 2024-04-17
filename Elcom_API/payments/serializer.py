from rest_framework import serializers
from payments.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    """ Serializer for payments """

    class Meta:
        model = Payment
        fields = '__all__'
