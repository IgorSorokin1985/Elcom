# Generated by Django 4.2.7 on 2024-04-08 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0002_payment_invoice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='invoice',
            field=models.FileField(blank=True, null=True, upload_to='media/', verbose_name='invoice_path'),
        ),
    ]