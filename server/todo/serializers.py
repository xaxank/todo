from rest_framework import serializers
from .models import Task, Category

class TaskSerializer(serializers.ModelSerializer):

	class Meta:
		model = Task 
		fields = ('pk', 'title', 'completed', 'category')

class CategorySerializer(serializers.ModelSerializer):

	class Meta:
		model = Category 
		fields = ('pk', 'title')