from rest_framework import serializers
from .models import taskapp
class taskserializer(serializers.ModelSerializer):
    class Meta:
        model = taskapp
        fields ='__all__'