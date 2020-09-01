from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/category/', views.category_list),
    path('api/category_update/', views.category_update),
    path('api/category_delete/', views.category_delete),
    path('api/task/', views.task_list),
    path('api/task_update/', views.task_update),
    path('api/task_delete/', views.task_delete),
]