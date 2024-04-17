from django.db import models


NULLABLE = {'blank': True, 'null': True}


class Company(models.Model):
    """ Model for Companies """
    name = models.CharField(max_length=100, verbose_name='Company name')
    inn = models.CharField(max_length=10, verbose_name='Company INN')
    kpp = models.CharField(max_length=10, verbose_name='Company KPP')
    address = models.CharField(max_length=100, verbose_name='Company Address')
    amount = models.CharField(max_length=100, verbose_name='Company Amount')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'
