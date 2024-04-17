from rest_framework import serializers
from companies.models import Company


class CompanySerializer(serializers.ModelSerializer):
    """Serializer for Companies"""

    class Meta:
        model = Company
        fields = '__all__'
