# Generated by Django 3.0.6 on 2021-05-29 14:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0003_auto_20210205_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='transaction_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 29, 14, 1, 49, 854671)),
        ),
        migrations.AddField(
            model_name='wire',
            name='transaction_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 5, 29, 14, 1, 49, 853770)),
        ),
    ]
