import datetime
from django.db import models

# Create your models here.


class CategoryManager(models.Manager):
	
	def create_category(self, title):
		category = self.create(title=title)
		return category

	def delete_category(self, id):
		category = Category.objects.get(id=id)
		category.delete()

	def update_category(self, id, title):
		category = Category.objects.get(id=id)
		category.title = title
		category.save()

class Category(models.Model):

	title = models.CharField(max_length=100)
	

	def __str__(self):
		return '{}'.format(self.title)




class TaskManager(models.Manager):
	
	def create_task(self, title, category):
		task = self.create(title=title,category=category)
		task.created_time = datetime.datetime.now();
		return task

	def update_task(self, id, title):
		task = Task.objects.get(id=id)
		task.title = title
		task.updated_time = datetime.datetime.now()
		task.save()

	def change_state(self, id, state):
		task = Task.objects.get(id=id)
		task.completed = state
		task.updated_time = datetime.datetime.now()
		task.save()

class Task(models.Model):

	title = models.CharField(max_length=100)
	completed = models.BooleanField(default=False)
	created_time = models.DateTimeField(auto_now=True)
	updated_time = models.DateTimeField(auto_now=True)
	category = models.ForeignKey(Category, default="general",on_delete=models.CASCADE)

	objects = TaskManager()
		
	def __str__(self):
		return '{}'.format(self.title)