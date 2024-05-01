from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Cart
from .serializers import CartSerializer

@csrf_exempt
def cart_list(request):
    if request.method == 'GET':
        carts = Cart.objects.all()
        serialized_carts = CartSerializer(carts, many=True)
        return JsonResponse(serialized_carts.data, safe=False)
    elif request.method == 'POST':
        cart_data = JSONParser().parse(request)
        serialized_cart = CartSerializer(data=cart_data)
        if serialized_cart.is_valid():
            serialized_cart.save()
            return JsonResponse(serialized_cart.data, status=201)
        return JsonResponse(serialized_cart.errors, status=400)

@csrf_exempt
def cart_detail(request, pk):
    try:
        cart = Cart.objects.get(pk=pk)
    except Cart.DoesNotExist:
        return JsonResponse({'error': 'Cart not found'}, status=404)

    if request.method == 'GET':
        serialized_cart = CartSerializer(cart)
        return JsonResponse(serialized_cart.data)

    elif request.method == 'PUT':
        cart_data = JSONParser().parse(request)
        serialized_cart = CartSerializer(cart, data=cart_data)
        if serialized_cart.is_valid():
            serialized_cart.save()
            return JsonResponse(serialized_cart.data)
        return JsonResponse(serialized_cart.errors, status=400)

    elif request.method == 'DELETE':
        cart.delete()
        return JsonResponse({'message': 'Cart deleted successfully'}, status=204)
