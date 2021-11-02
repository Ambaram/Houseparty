from django.urls import path
from .views import CreateRoomView, GetRoomView, RoomView , RoomJoinView, UpdateRoom, UserInRoom, LeaveRoom

urlpatterns = [
    path('home',RoomView.as_view()),
    path('create-room',CreateRoomView.as_view()),
    path('get-room', GetRoomView.as_view()),
    path('join-room',RoomJoinView.as_view()),
    path('user-in-room',UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path("update-room", UpdateRoom.as_view())
]
