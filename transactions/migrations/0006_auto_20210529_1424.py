# Generated by Django 3.0.6 on 2021-05-29 14:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0005_auto_20210529_1422'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='transaction_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 29, 14, 24, 3, 569138)),
        ),
        migrations.AlterField(
            model_name='wire',
            name='transaction_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 29, 14, 24, 3, 568190)),
        ),
    ]
