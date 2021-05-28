from django.urls import path

from pages import views

urlpatterns = [
    path('', views.index, name="home"),
    path('about/', views.about, name="about"),
    path('cards/', views.cards, name="cards"),
    path('services/', views.services, name="services"),
    path('contact/', views.contact, name="contact"),
    path('documents/', views.documents, name="documents"),
    path('location/', views.location, name="location"),
    path('personal-banking/', views.personal_banking, name="personal-banking"),
    path('business-banking/', views.business_banking, name="business-banking"),
    path('mortgage-center/', views.mortgage_center, name="mortgage-center"),
    path('support/', views.support, name="support"),
    path('wire-transfer-services/', views.wire_transfer_services,
         name="wire-transfer-services"),
    # path('support/', views.support, name="support"),
]
