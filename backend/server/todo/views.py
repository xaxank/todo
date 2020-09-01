from django.shortcuts import render
from django.http import HttpResponse
from .models import TaskManager, CategoryManager, Task, Category

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import *


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        data = Category.objects.all()

        serializer = CategorySerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data":"Category successfully created"},status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def category_update(request):
        data = request.data
        category = Category.objects.get(id=data.get("pk"))
        
        try:
            category.title = data.get("title")
            category.save()
            return Response({"data":"Category successfully updated"},status=status.HTTP_200_OK)
        except Exception as e:
            # raise e
            return Response(e.message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def category_delete(request):
        data = request.query_params
        category = Category.objects.get(id=data.get("pk"))
        
        try:
            category.delete()
            return Response({"data":"Category successfully deleted"},status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            # raise e
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        category_id = request.query_params.get('category_id')
        category = Category.objects.get(id=category_id)
        data = Task.objects.filter(category=category)

        serializer = TaskSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data":"Task successfully created"},status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def task_update(request):
        data = request.data
        category = Task.objects.get(id=data.get("pk"))
        
        try:
            category.title = data.get("title")
            category.completed = data.get("completed")
            category.save()
            return Response({"data":"Category successfully updated"},status=status.HTTP_200_OK)
        except Exception as e:
            # raise e
            return Response(e.message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def task_delete(request):
        data = request.query_params
        category = Task.objects.get(id=data.get("pk"))
        
        try:
            category.delete()
            return Response({"data":"Category successfully deleted"},status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            # raise e
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


