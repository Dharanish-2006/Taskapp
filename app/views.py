from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import taskapp
from.serializer import taskserializer
class taskviews(viewsets.ModelViewSet):
    queryset = taskapp.objects.all()
    serializer_class=taskserializer