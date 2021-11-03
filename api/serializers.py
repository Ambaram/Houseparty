from django.db.models import fields
from django.db.models.base import Model
from rest_framework import serializers, validators
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("id","code","host","guest_can_pause","votes_to_skip","created_at")


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields=("guest_can_pause", "votes_to_skip")

class JoinRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ("id","code","host","guest_can_pause")


class UpdateRoomSerializer(serializers.ModelSerializer):
    code  = serializers.CharField(validators=[])
    class Meta:
        model = Room
        fields = ("code", "guest_can_pause", "votes_to_skip")