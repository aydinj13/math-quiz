from rest_framework import viewsets
from .models import LeaderboardEntry
from .serializers import LeaderboardEntrySerializer

class LeaderboardEntryViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all().order_by('-score')
    serializer_class = LeaderboardEntrySerializer