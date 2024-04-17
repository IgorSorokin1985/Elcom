from django.db import models
from orders.models import Order

NULLABLE = {'blank': True, 'null': True}


class Payment(models.Model):
    """ Model for payments """
    METHODS = (
        ("C", "Cash"),
        ("T", "Translation")
    )
    STATUSES = (
        ("P", "Process"),
        ("S", "SUCCESS"),
        ("C", "CANCELED")
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='Order')
    date = models.DateField(auto_now_add=True, editable=False, verbose_name="Date of payment")
    method = models.CharField(max_length=1, choices=METHODS, default="T")
    url_for_payment = models.CharField(max_length=1000, **NULLABLE, verbose_name='url for payment')
    status = models.CharField(max_length=1, choices=STATUSES, default="P")
    invoice = models.CharField(max_length=1000, **NULLABLE, verbose_name="invoice_path")

    def __str__(self):
        return f'{self.order}'

    class Meta:
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'
