from django.db import models

# Create your models here.
NULLABLE = {'blank': True, 'null': True}


class Category(models.Model):
    """ Model fo Categories """
    name = models.CharField(max_length=50, verbose_name='Category name')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Item(models.Model):
    """ Model fo Items """
    name = models.CharField(max_length=100, verbose_name='Item name')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='Category')
    power = models.FloatField(**NULLABLE, verbose_name='Item power')
    speed = models.PositiveIntegerField(**NULLABLE, verbose_name='Item speed')
    im = models.CharField(**NULLABLE, max_length=10, verbose_name='Item IM')
    weight = models.FloatField(verbose_name='Item weight')
    foto = models.ImageField(upload_to='media/', **NULLABLE, verbose_name='Item foto')
    price = models.PositiveIntegerField(verbose_name='Item price')
    is_published = models.BooleanField(default=True, verbose_name='Is published')
    stock = models.PositiveIntegerField(verbose_name='Stock of Item')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Item'
        verbose_name_plural = 'Items'
