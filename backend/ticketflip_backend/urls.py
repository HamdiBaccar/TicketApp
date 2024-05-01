from user.views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView,UserRegisterAPIView,UserLoginAPIView,UserLogoutAPIView
from django.urls import path
from event import views as event_views
from booking import views as booking_views
from ticket import views as ticket_views
from cart import views as cart_views

from payment import views as payment_views
from event.views import EventCreateAPIView
from feedback import views as feedback_views
from django.urls import path, include
from rating.views import rating_detail, rating_create, rating_update, rating_delete, rating_list

urlpatterns = [
    path('api/users', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('api/users/<int:pk>', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-retrieve-update-destroy'),
    path('api/auth/register/', UserRegisterAPIView.as_view(), name='user-register'),
    path('api/auth/login/', UserLoginAPIView.as_view(), name='user-login'),
    path('api/auth/logout/',UserLogoutAPIView.as_view(), name='user-logout'),
    path('create/events/', EventCreateAPIView.as_view(), name='event-create'),
    path('events/', event_views.event_list, name='event_list'),
    path('events/<int:pk>/', event_views.event_detail, name='event_detail'),
    path('bookings/', booking_views.booking_list, name='booking_list'),
    path('bookings/<int:pk>/', booking_views.booking_detail, name='booking_detail'),
    path('tickets/', ticket_views.ticket_list, name='ticket_list'),
    path('tickets/<int:pk>/', ticket_views.ticket_detail, name='ticket_detail'),
    path('feedbacks/', feedback_views.feedback_list, name='feedback_list'),
    path('feedbacks/<int:pk>/', feedback_views.feedback_detail, name='feedback_detail'),
    path('event/<int:event_id>/ratings/', rating_list, name='rating_list'),
    path('event/<int:event_id>/rating/<int:rating_id>/', rating_detail, name='rating_detail'),
    path('event/<int:event_id>/rating/create/', rating_create, name='rating_create'),
    path('event/<int:event_id>/rating/<int:rating_id>/update/', rating_update, name='rating_update'),
    path('event/<int:event_id>/rating/<int:rating_id>/delete/', rating_delete, name='rating_delete'),
    path('carts/', cart_views.cart_list, name='cart_list'),
    path('carts/<int:pk>/', cart_views.cart_detail, name='cart_detail'),
    path('payments/', payment_views.payment_list, name='payment_list'),
    path('payments/<int:pk>/', payment_views.payment_detail, name='payment_detail'),
]








