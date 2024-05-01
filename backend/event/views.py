from django.shortcuts import render

from django.http import JsonResponse
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Event
from .serializers import EventSerializer
from rest_framework import status

@csrf_exempt
def event_list(request):
    if request.method == 'GET':
        category = request.GET.get('category')
        if category:
            events = Event.objects.filter(category=category)
        else:
            events = Event.objects.all()

        serialized_events = EventSerializer(events, many=True)
        return JsonResponse(serialized_events.data, safe=False)

    elif request.method == 'POST':
        event_data = JSONParser().parse(request)
        serialized_event = EventSerializer(data=event_data)
        if serialized_event.is_valid():
            serialized_event.save()
            return JsonResponse(serialized_event.data, status=201)
        return JsonResponse(serialized_event.errors, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser
from .models import Event
from .serializers import EventSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

@csrf_exempt
def event_detail(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Event not found'}, status=404)

    if request.method == 'GET':
        serialized_event = EventSerializer(event)
        return JsonResponse(serialized_event.data)

    elif request.method == 'PUT':
        try:
            event_data = JSONParser().parse(request)
            serialized_event = EventSerializer(event, data=event_data)
            if serialized_event.is_valid():
                serialized_event.save()
                return JsonResponse(serialized_event.data)
            return JsonResponse(serialized_event.errors, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    elif request.method == 'DELETE':
        try:
            event.delete()
            return JsonResponse({'message': 'Event deleted successfully'}, status=204)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

class EventCreateAPIView(APIView):
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save(is_approved=True)  # Set is_approved to True
            return Response({"message": "Event created successfully", "event_id": event.id}, status=status.HTTP_201_CREATED)
        return Response({"message": "Failed to create event", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

