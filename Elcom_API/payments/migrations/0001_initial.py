# Generated by Django 4.2.7 on 2024-04-04 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True, verbose_name='Date of payment')),
                ('method', models.CharField(choices=[('C', 'Cash'), ('T', 'Translation')], default='T', max_length=1)),
                ('url_for_payment', models.CharField(blank=True, max_length=1000, null=True, verbose_name='url for payment')),
                ('status', models.CharField(choices=[('P', 'Process'), ('S', 'SUCCESS'), ('C', 'CANCELED')], default='P', max_length=1)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.order', verbose_name='Order')),
            ],
            options={
                'verbose_name': 'Payment',
                'verbose_name_plural': 'Payments',
            },
        ),
    ]
