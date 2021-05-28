import os
import random

from django.contrib import auth, messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from django.conf import settings
# from django.http import HttpResponse
from twilio.rest import Client

from ledgers.models import Ledger
from transactions.models import Wire
from django.contrib.auth.models import User

from contacts.models import Contact
from location import location


def index(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        if request.method == "POST":
            username = request.POST["username"]
            password = request.POST["password"]
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                print(user)
                print(username, password)
                auth.login(request, user)
                messages.success(request, "Logged in successfully!")
                return redirect('dashboard')
            else:
                messages.error(request, "Wrong username/password combination")
                # print(user)
                # print(username, password)
                # print("Wrong username/password combination")
                return redirect("login")
    return render(request, 'pages/home.html')


def about(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/about.html')


def contact(request):
    if request.method == "POST":
        full_name = request.POST["name"]
        email = request.POST["email"]
        phone = request.POST["phone_number"]
        subject = request.POST["msg_subject"]
        message = request.POST["message"]
        checkbox = request.POST["checkbox"]
        if checkbox == 'on':
            checkbox = True
        else:
            checkbox = False

        contact_form = Contact(
            full_name=full_name, email=email, phone=phone, subject=subject, message=message, checkbox=checkbox
        )

        contact_form.save()
        messages.success(
            request, "Thank you for contacting us. A representative will respond to you shortly!")
        return redirect("home")

    return render(request, 'pages/contact.html')


def cards(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/credit-card.html')


def services(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/services.html')


def documents(request):
    return render(request, 'pages/documents.html')


def location(request):
    return render(request, 'pages/location.html')


def personal_banking(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/personal-banking.html')


def business_banking(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/business-banking.html')


def mortgage_center(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/mortgage-center.html')


def support(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/support.html')


def wire_transfer_services(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return render(request, 'pages/wire-transfer-services.html')
#
#
# def index(request):
#     return render(request, 'pages/home.html')
#
#
# def index(request):
#     return render(request, 'pages/home.html')
