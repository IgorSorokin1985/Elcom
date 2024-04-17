from django.contrib import admin
from orders.models import Order, Position
# Register your models here.


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('pk', 'user', 'status')


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ('pk', 'order', 'item', 'quantity')
