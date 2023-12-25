
from django.urls import path, include
from rest_framework import routers
from mathquiz.views import LeaderboardEntryViewSet

router = routers.DefaultRouter()
router.register(r'leaderboard', LeaderboardEntryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    # ... other url patterns
]