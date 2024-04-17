from django.db import models
from users.models import User
from companies.models import Company
from items.models import Item

# Create your models here.
NULLABLE = {'blank': True, 'null': True}


class Order(models.Model):
    """ Model for Order """
    ORDER_STATUSES = (
        ("P", "Process"),
        ("R", "Ready"),
        ("D", "Done"),
        ("C", "Canceled")
    )
    data = models.DateField(auto_now_add=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="User")
    company = models.ForeignKey(Company, **NULLABLE, on_delete=models.CASCADE, verbose_name='Company')
    status = models.CharField(max_length=100, default="P", choices=ORDER_STATUSES, verbose_name='Status')
    payment_status = models.BooleanField(default=False, verbose_name='Payment status')

    def __str__(self):
        return f'{self.data}'

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'


class Position(models.Model):
    """ Model for position """
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='Order')
    item = models.ForeignKey(Item, on_delete=models.CASCADE, verbose_name='Item')
    quantity = models.PositiveIntegerField(verbose_name='quantity')
    price = models.PositiveIntegerField(verbose_name="Price")

    def __str__(self):
        return f'{self.item}'

    class Meta:
        verbose_name = 'Position'
        verbose_name_plural = 'Positions'
