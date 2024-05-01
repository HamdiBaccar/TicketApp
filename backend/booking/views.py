from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Booking
from .serializers import BookingSerializer

@csrf_exempt
def booking_list(request):
    if request.method == 'GET':
        bookings = Booking.objects.all()
        serialized_bookings = BookingSerializer(bookings, many=True)
        return JsonResponse(serialized_bookings.data, safe=False)
    elif request.method == 'POST':
        booking_data = JSONParser().parse(request)
        serialized_booking = BookingSerializer(data=booking_data)
        if serialized_booking.is_valid():
            serialized_booking.save()
            return JsonResponse(serialized_booking.data, status=201)
        return JsonResponse(serialized_booking.errors, status=400)

@csrf_exempt
def booking_detail(request, pk):
    try:
        booking = Booking.objects.get(pk=pk)
    except Booking.DoesNotExist:
        return JsonResponse({'error': 'Booking not found'}, status=404)

    if request.method == 'GET':
        serialized_booking = BookingSerializer(booking)
        return JsonResponse(serialized_booking.data)

    elif request.method == 'PUT':
        booking_data = JSONParser().parse(request)
        serialized_booking = BookingSerializer(booking, data=booking_data)
        if serialized_booking.is_valid():
            serialized_booking.save()
            return JsonResponse(serialized_booking.data)
        return JsonResponse(serialized_booking.errors, status=400)

    elif request.method == 'DELETE':
        booking.delete()
        return JsonResponse({'message': 'Booking deleted successfully'}, status=204)

