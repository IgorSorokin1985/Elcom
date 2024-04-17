from django.contrib import admin
from payments.models import Payment
# Register your models here.


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('pk', 'order', 'status', 'url_for_payment', 'invoice')
