"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet
from django.http import JsonResponse
import os

# Define the router and register the viewsets
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('teams', TeamViewSet)
router.register('activities', ActivityViewSet)
router.register('leaderboards', LeaderboardViewSet)
router.register('workouts', WorkoutViewSet)

def api_url_response(request, component):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        url = f"https://{codespace_name}-8000.app.github.dev/api/{component}/"
    else:
        url = f"http://localhost:8000/api/{component}/"
    return JsonResponse({"url": url})

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/url/<str:component>/', api_url_response, name='api_url_response'),
    path('admin/', admin.site.urls),
]
