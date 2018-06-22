# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import uuid
from django import forms

# class categories for Notes
class Categories(models.Model):
    category = models.CharField(max_length=30)

# class Users
class Users(models.Model):
    login = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)
    password = models.CharField(max_length=30)
    active = models.BooleanField(default=False)

# class Notes for Users
class Notes(models.Model):
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
    categories = models.ForeignKey(Categories, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=400)
    date_create = models.DateTimeField()
    favorites = models.BooleanField(default=False)
    publish = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4 ,editable=False, unique=True)
