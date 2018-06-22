"""hello URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from firstapp import views



urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'main/', views.main),
    url(r'getpublish/', views.get_notes_main),
    url(r'registr/', views.registr),
    url(r'auth/', views.auth),

    url(r'user/', views.user),
    url(r'get/', views.get_notes),
    url(r'create/', views.create_notes),
    url(r'edit/(?P<id>[0-9]{1})', views.edit_note),
    url(r'delete/(?P<id>[0-9]{1})', views.remove_note),
    url(r'publish/(?P<id>[0-9]{1})', views.publish),
    url(r'favorites/(?P<id>[0-9]{1})', views.favorites),
    url(r'note/(?P<uuid>.*)/', views.get_uuid),
    url(r'logout/', views.logout),


]
