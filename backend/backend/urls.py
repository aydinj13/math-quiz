from django.urls import path, include
from rest_framework import routers
from mathquiz import views

router = routers.DefaultRouter()
router.register(r'leaderboard', views.LeaderboardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]