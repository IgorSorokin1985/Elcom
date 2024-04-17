from rest_framework import serializers
from items.models import Item, Category


class ItemSerializer(serializers.ModelSerializer):
    """Serializer for Items"""

    class Meta:
        model = Item
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for Categories"""

    class Meta:
        model = Category
        fields = '__all__'
