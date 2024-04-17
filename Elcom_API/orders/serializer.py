from rest_framework import serializers
from orders.models import Order, Position
from items.models import Item
from orders.utils import get_summa_order, get_quantity_order, get_availability_position
from payments.models import Payment


class PositionSerializer(serializers.ModelSerializer):
    item_name = serializers.SerializerMethodField()
    availability_info = serializers.SerializerMethodField()

    class Meta:
        model = Position
        fields = '__all__'
        read_only_fields = ['order', 'price', 'item']

    def get_item_name(self, instance):
        return Item.objects.get(pk=instance.item.pk).name

    def get_availability_info(self, instance):
        return get_availability_position(instance)


class OrderSerializer(serializers.ModelSerializer):
    count_positions = serializers.SerializerMethodField()
    positions = PositionSerializer(source="position_set", many=True, read_only=True)
    summa = serializers.SerializerMethodField()
    quantity = serializers.SerializerMethodField()
    url_for_pay = serializers.SerializerMethodField()
    invoice = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user']

    def get_count_positions(self, instance):
        return len(Position.objects.all().filter(order=instance.pk))

    def get_summa(self, instance):
        return get_summa_order(instance)

    def get_url_for_pay(self, instance):
        payment = Payment.objects.filter(order=instance.pk).last()
        if payment:
            return payment.url_for_payment
        else:
            return False

    def get_invoice(self, instance):
        payment = Payment.objects.filter(order=instance.pk).last()
        if payment and payment.invoice:
            return payment.invoice
        else:
            return False

    def get_quantity(self, instance):
        return get_quantity_order(instance)
