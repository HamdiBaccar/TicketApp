from django.shortcuts import render

from django.http import JsonResponse
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Event
from .serializers import EventSerializer
from rest_framework import status

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser
from .models import Event
from .serializers import EventSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import AuthenticationFailed
from django.http import JsonResponse
class EventCreateAPIView(APIView):
    def post(self, request):
        # Deserialize the request data
        serializer = EventSerializer(data=request.data)
        
        # Check if the request data is valid
        if serializer.is_valid():
            # Save the event with the organizer ID included in the request data
            event = serializer.save(is_approved=True)  # Set is_approved to True
            
            # Retrieve the organizer ID from the request data
            organizer_id = serializer.validated_data['organizer']
            
            # Now you can use the organizer_id as needed
            
            return Response({"message": "Event created successfully", "event_id": event.id}, status=status.HTTP_201_CREATED)
        else:
            # If request data is not valid, return error response
            return Response({"message": "Failed to create event", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.POST.get('image_base64'):
        image_base64 = request.POST['image_base64']
        try:
            event_id = int(request.POST.get('event_id'))  # Assuming you pass event ID along with the image
            event = Event.objects.get(pk=event_id)
        except (ValueError, Event.DoesNotExist):
            return JsonResponse({'error': 'Invalid event ID'}, status=400)
        
        # Decode the base64 string and save it as the image file
        format, imgstr = image_base64.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr), name=f"{event.title}_image.{ext}")
        event.image_base64.save(f"{event.title}_image.{ext}", data, save=True)

        return JsonResponse({'message': 'Image uploaded successfully'}, status=201)
    else:
        return JsonResponse({'error': 'Image upload failed'}, status=400)
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


