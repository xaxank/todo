from django.contrib import admin
from . import models


class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "completed")


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title",)


admin.site.register(models.Task, TaskAdmin)
admin.site.register(models.Category, CategoryAdmin)