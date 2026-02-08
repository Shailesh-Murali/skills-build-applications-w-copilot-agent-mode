from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        ironman = User.objects.create_user(email='ironman@marvel.com', username='ironman', password='pass', team=marvel)
        captain = User.objects.create_user(email='captain@marvel.com', username='captain', password='pass', team=marvel)
        batman = User.objects.create_user(email='batman@dc.com', username='batman', password='pass', team=dc)
        superman = User.objects.create_user(email='superman@dc.com', username='superman', password='pass', team=dc)

        # Create activities
        Activity.objects.create(user=ironman, type='run', duration=30)
        Activity.objects.create(user=batman, type='cycle', duration=45)
        Activity.objects.create(user=captain, type='swim', duration=20)
        Activity.objects.create(user=superman, type='walk', duration=60)

        # Create workouts
        Workout.objects.create(user=ironman, description='Chest workout', duration=40)
        Workout.objects.create(user=batman, description='Leg workout', duration=50)

        # Create leaderboard
        Leaderboard.objects.create(user=ironman, points=100)
        Leaderboard.objects.create(user=batman, points=90)
        Leaderboard.objects.create(user=captain, points=80)
        Leaderboard.objects.create(user=superman, points=70)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
