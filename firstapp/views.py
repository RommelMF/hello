# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, HttpResponseRedirect, HttpResponsePermanentRedirect, HttpResponseNotFound
from django.shortcuts import render
from django.template.response import TemplateResponse
from .forms import UserForm
from .models import Person

# Create your views here.

# def index(responce):
#     return HttpResponse('<h1>Main</h1>')
#
# def about(responce):
#     return HttpResponse('<h1>About</h1>')
#
# def contact(responce):
#     return HttpResponse('<h1>Contacts</h1>')

# get urls

# def products(request, productid = 3):
#     output = "<h2>Product № {0}</h2>".format(productid)
#     return HttpResponse(output)
#
#
# def users(request, id = 1 , name = 'Tom'):
#     output = "<h2>User</h2><h3>id: {0}  name: {1}</h3>".format(id, name)
#     return HttpResponse(output)

# get url parameters
# def products(request, productid):
#     category = request.GET.get("cat", "")
#     output = "<h2>Product № {0}  Category: {1}</h2>".format(productid, category)
#     return HttpResponse(output)
#
#
# def users(request):
#     id = request.GET.get("id", 1)
#     name = request.GET.get("name", "Tom")
#     output = "<h2>User</h2><h3>id: {0}  name: {1}</h3>".format(id, name)
#     return HttpResponse(output)

#redirect
# def index(request):
#     return HttpResponse("Index")
#
#
# def about(request):
#     return HttpResponse("About")
#
#
# def contact(request):
#     return HttpResponseRedirect("/about")
#
#
# def details(request):
#     return HttpResponsePermanentRedirect("/")

# def index(request):
#     # return render(request, 'firstapp/home.html')
#     # return TemplateResponse(request, 'firstapp/home.html')
#
#     # set data in dict
#     # data = {'header': 'Hello Peoples', 'message': 'Welcome to Python'}
#     # return render(request, 'index.html', context=data)
#     header = "Personal Data"  # обычная переменная
#     langs = ["English", "German", "Spanish"]  # массив
#     user = {"name": "Tom", "age": 23}  # словарь
#     addr = ("Абрикосовая", 23, 45)  # кортеж
#
#     data = {"header": header, "langs": langs, "user": user, "address": addr}
#     return render(request, "index.html", context=data)

# def index(request):
#     if request.method == 'POST':
#         userform = UserForm(request.POST)
#
#         if userform.is_valid():
#             name = userform.changed_data['name']
#
#             return HttpResponse('<h1> Hello {0}</h1>'.format(name))
#         else:
#             return HttpResponse('Invalid data, please try again')
#     else:
#         userForm = UserForm()
#
#         return render(request, 'index.html', {'form': userForm})

# получение данных из бд
def index(request):
    people = Person.objects.all()
    return render(request, "index.html", {"people": people})


# сохранение данных в бд
def create(request):
    if request.method == "POST":
        tom = Person()
        tom.name = request.POST.get("name")
        tom.age = request.POST.get("age")
        tom.save()
    return HttpResponseRedirect("/")

# изменение данных в БД
def edit(request, id):
    try:
        person = Person.objects.get(id=id)

        if request.method =='POST':
            person.name = request.POST.get('name')
            person.age = request.POST.get('age')
            person.save()
            return  HttpResponseRedirect('/')
        else:
            return render(request, 'edit.html', {'person': person})
    except Person.DoesNotExist:
        return HttpResponseNotFound('<h2>Person not found</h2>')


# удаление данных
def delete(request, id):
    try:
        person = Person.objects.get(id=id)
        person.delete()
        return HttpResponseRedirect('/')
    except Person.DoesNotExist:
        return HttpResponseNotFound('<h2>Person not found</h2>')

def test(request):
    id = 1
    try:
        person = Person.objects.get(id=id)

        if request.method =='POST':
            person.name = request.POST.get('name')
            person.age = request.POST.get('age')
            person.save()
            return  HttpResponseRedirect('/')
        else:
            return render(request, 'edit.html', {'person': person})
    except Person.DoesNotExist:
        return HttpResponseNotFound('<h2>Person not found</h2>')

