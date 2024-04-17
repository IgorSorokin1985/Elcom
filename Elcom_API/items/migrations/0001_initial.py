# Generated by Django 4.2.7 on 2024-04-04 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Category name')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Item name')),
                ('power', models.FloatField(blank=True, null=True, verbose_name='Item power')),
                ('speed', models.PositiveIntegerField(blank=True, null=True, verbose_name='Item speed')),
                ('im', models.CharField(blank=True, max_length=10, null=True, verbose_name='Item IM')),
                ('weight', models.FloatField(verbose_name='Item weight')),
                ('foto', models.ImageField(blank=True, null=True, upload_to='media/', verbose_name='Item foto')),
                ('price', models.PositiveIntegerField(verbose_name='Item price')),
                ('is_published', models.BooleanField(default=True, verbose_name='Is published')),
                ('stock', models.PositiveIntegerField(verbose_name='Stock of Item')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='items.category', verbose_name='Category')),
            ],
            options={
                'verbose_name': 'Item',
                'verbose_name_plural': 'Items',
            },
        ),
    ]
