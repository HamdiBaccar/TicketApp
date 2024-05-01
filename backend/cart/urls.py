from django.urls import path
from rest_framework import routers

from . import views  # Assuming views.py is in the same directory
from . import viewsets  # Assuming viewsets.py is in the same directory

router = routers.DefaultRouter()
router.register(r'cart', viewsets.CartViewSet, basename='cart')  # Using ViewSets

urlpatterns = [
    path('detail/', views.cart_detail, name='cart_detail'),  # Optional template view
    path('', views.get_cart, name='get_cart'),
    path('<int:event_id>/', views.add_to_cart, name='add_to_cart'),
    path('<int:event_id>/', views.manage_cart_item, name='manage_cart_item'),  # For add/remove/update
] + router.urls
