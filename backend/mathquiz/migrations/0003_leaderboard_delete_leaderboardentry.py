# Generated by Django 5.0 on 2023-12-25 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mathquiz', '0002_leaderboardentry_delete_leaderboard'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leaderboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=100)),
                ('score', models.IntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='LeaderboardEntry',
        ),
    ]
