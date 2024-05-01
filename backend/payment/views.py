from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Payment
from .serializers import PaymentSerializer

@csrf_exempt
def payment_list(request):
    if request.method == 'GET':
        payments = Payment.objects.all()
        serialized_payments = PaymentSerializer(payments, many=True)
        return JsonResponse(serialized_payments.data, safe=False)
    elif request.method == 'POST':
        payment_data = JSONParser().parse(request)
        serialized_payment = PaymentSerializer(data=payment_data)
        if serialized_payment.is_valid():
            serialized_payment.save()
            return JsonResponse(serialized_payment.data, status=201)
        return JsonResponse(serialized_payment.errors, status=400)

@csrf_exempt
def payment_detail(request, pk):
    try:
        payment = Payment.objects.get(pk=pk)
    except Payment.DoesNotExist:
        return JsonResponse({'error': 'Payment not found'}, status=404)

    if request.method == 'GET':
        serialized_payment = PaymentSerializer(payment)
        return JsonResponse(serialized_payment.data)

    elif request.method == 'PUT':
        payment_data = JSONParser().parse(request)
        serialized_payment = PaymentSerializer(payment, data=payment_data)
        if serialized_payment.is_valid():
            serialized_payment.save()
            return JsonResponse(serialized_payment.data)
        return JsonResponse(serialized_payment.errors, status=400)

    elif request.method == 'DELETE':
        payment.delete()
        return JsonResponse({'message': 'Payment deleted successfully'}, status=204)

