from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated  # Optional

from .models import Cart
from .serializers import CartSerializer

class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]  # Optional: Only authenticated users can access
    queryset = Cart.objects.all()
    serializer_class = CartSerializer