from django.db import models
from django.contrib.auth.models import AbstractUser
from companies.models import Company

# Create your models here.
NULLABLE = {'blank': True, 'null': True}


class User(AbstractUser):
    """Model for users"""
    username = None
    name = models.CharField(max_length=50, verbose_name='Name')
    email = models.EmailField(unique=True, verbose_name='Email')
    telegram_chat_id = models.CharField(max_length=50, unique=True, verbose_name='Telegram chat ID')
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, **NULLABLE)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Log(models.Model):
    """ Model fo logs """
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    action = models.CharField(max_length=100, verbose_name='Action')
    datetime = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.action

    class Meta:
        verbose_name = 'Log'
        verbose_name_plural = 'Logs'
