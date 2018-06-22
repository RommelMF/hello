# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render
from .models import Users
from .models import Notes
from .models import Categories
import datetime
from django.utils import timezone

import json


# Create your views here.

# display main page
def main(request):
    return render(request, "main.html")

# get notes for main page
def get_notes_main(request):
    # get all publish notes
    notes = Notes.objects.filter(publish=True).values('pk','title','description', 'date_create','categories','categories__category', 'users', 'users__login', 'favorites', 'publish', 'uuid')

    notes_list = list(notes)
    i = 0;
    for item in notes_list:
        replace_uuid = item['uuid'].urn.split('uuid:')[1]
        replace_dateTime = item['date_create'].strftime("%Y-%m-%dT%H:%M:%S")
        item['uuid'] = replace_uuid
        item['date_create'] = replace_dateTime
        i = i + 1

    data = json.dumps(notes_list)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')

# user authorization
def auth(request):
    if(request.method == 'POST'):
        data = dict(request.POST)
        user = Users.objects.filter(login = data['login'][0], password = data['password'][0]).get()

        if(user != None):
            responce = {"success": True, "message": "PASS", '_meta': ''}
            user.active = True
            user.save()

        else:
            responce = {"success": False, "message": "Error", '_meta': ''}

        data = json.dumps(responce)
        bytes = data.encode('utf-8')

        return HttpResponse(bytes, content_type='application/json')
    else:
        return render(request, "auth.html")

# user registration
def registr(request):
    if (request.method == 'POST'):
        data = dict(request.POST)
        user = Users.objects.create(login=data['login'][0], password=data['password'][0], email=data['email'][0])

        if (user != None):
            responce = {"success": True, "message": "Registration success", '_meta': ''}
        else:
            responce = {"success": False, "message": "Error", '_meta': ''}

        data = json.dumps(responce)
        bytes = data.encode('utf-8')

        return HttpResponse(bytes, content_type='application/json')
    else:
        return render(request, "registr.html")

# make a favorites
def favorites(request, id):
    note = Notes.objects.get(pk=id)

    if(note.favorites == False):
        note.favorites = True
    else:
        note.favorites = False

    note.save()

    responce = {"success": True, "message": "note make favorites", '_meta': ''}
    data = json.dumps(responce)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')

# display page user notes
def user(request):
    return render(request, "user.html")

# get user notes
def get_notes(request):
    # get object user by id
    user = Users.objects.get(active=True)
    # get all notes for user
    notes = Notes.objects.filter(users=user.pk).values('pk','title','description', 'date_create','categories','categories__category', 'users', 'users__login', 'favorites', 'publish', 'uuid')

    notes_list = list(notes)
    i = 0;
    for item in notes_list:
        replace_uuid = item['uuid'].urn.split('uuid:')[1]
        replace_dateTime = item['date_create'].strftime("%Y-%m-%dT%H:%M:%S")
        item['uuid'] = replace_uuid
        item['date_create'] = replace_dateTime
        i = i + 1

    data = json.dumps(notes_list)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')

# create user notes
def create_notes(request):
    data = dict(request.POST)
    user = Users.objects.get(active=True)
    category = Categories.objects.get(pk=data['category'][0])

    if('favorites' not in data):
        data['favorites'] = 'off'

    Notes.objects.create(users=user, categories=category, title=data['title'][0],description=data['description'][0], date_create=datetime.datetime.now(timezone.utc), favorites= True if data['favorites'][0] == 'on' else False)

    responce = {"success": True, "message":"note added", '_meta': ''}
    data = json.dumps(responce)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')

# remove user notes
def remove_note(request, id):
    # get note by id
    note = Notes.objects.filter(id=id).delete()

    responce = {"success": True, "message": "note deleted", '_meta': ''}
    data = json.dumps(responce)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')

# edit user notes
def edit_note(request, id):
    # if method = POST, update note, else get note
    new_data = dict(request.POST)
    category = Categories.objects.get(pk=new_data['category'][0])
    Notes.objects.filter(pk=id).update(categories=category, title=new_data['title'][0],description=new_data['description'][0], date_create=datetime.datetime.now(timezone.utc), favorites= True if new_data['favorites'][0] == 'on' else False)

    responce = {"success": True, "message": "note edited", '_meta': ''}

    data = json.dumps(responce)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')

# publish user notes
def publish(request, id):
    note = Notes.objects.get(pk=id)

    if(note.publish):
        Notes.objects.filter(pk=id).update(publish=False)
        responce = {"success": True, "message": "Note not publish", '_meta': ''}
    else:
        Notes.objects.filter(pk=id).update(publish=True)
        responce = {"success": True, "message": "Note publish", '_meta': ''}

    data = json.dumps(responce)
    bytes = data.encode('utf-8')
    return HttpResponse(bytes, content_type='application/json')

# get page with one notes by uuid
def get_uuid(request, uuid):
    note = Notes.objects.filter(publish=True, uuid=uuid).get()

    if(note != None):
        return HttpResponseNotFound('<h1> '+ note.title +' </h1>' + '<h2>'+ note.description+'<h2/>' + '<h3>'+ note.users.login +'<h3/>')
    else:
        return HttpResponseNotFound('<h2>Note no published</h2>')

# user logout
def logout(request):
    user = Users.objects.get(active=True)
    user.active = False
    user.save()

    responce = {"success": True, "message": "logout", '_meta': ''}
    data = json.dumps(responce)
    bytes = data.encode('utf-8')

    return HttpResponse(bytes, content_type='application/json')






