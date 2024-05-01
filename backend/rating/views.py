from django.shortcuts import get_object_or_404
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from .models import Rating
from django.contrib.auth.decorators import login_required

def rating_list(request, event_id):
  """ Retrieves all ratings for a specific event. """
  try:
      event = Event.objects.get(pk=event_id)  # Ensure event exists
  except Event.DoesNotExist:
      return JsonResponse({'error': 'Event not found'}, status=404)
  ratings = Rating.objects.filter(event=event)
  data = [rating.to_dict() for rating in ratings]
  return JsonResponse(data, safe=False)

def rating_detail(request, event_id, rating_id):
  """ Retrieves a specific rating for an event. """
  try:
      event = Event.objects.get(pk=event_id)  # Ensure event exists
      rating = Rating.objects.get(pk=rating_id, event=event)  # Ensure rating belongs to event
  except (Event.DoesNotExist, Rating.DoesNotExist):
      return JsonResponse({'error': 'Rating not found'}, status=404)
  return JsonResponse(rating.to_dict(), safe=False)

@login_required  # Add if you need authentication for creating ratings
def rating_create(request, event_id):
  """ Creates a new rating for an event. """
  if request.method != 'POST':
      return JsonResponse({'error': 'Method not allowed'}, status=405)
  try:
      event = Event.objects.get(pk=event_id)  # Ensure event exists
  except Event.DoesNotExist:
      return JsonResponse({'error': 'Event not found'}, status=404)
  try:
      data = json.loads(request.body)
      nb_stars = data.get('nb_stars')
      if nb_stars is None or not isinstance(nb_stars, int) or nb_stars < 1 or nb_stars > 5:
          return JsonResponse({'error': 'Invalid nb_stars value'}, status=400)
      user = request.user  # Assuming user is retrieved from request (authentication)
      new_rating = Rating.objects.create(nb_stars=nb_stars, user=user, event=event)
      return JsonResponse(new_rating.to_dict(), safe=False)
  except Exception as e:
      return JsonResponse({'error': str(e)}, status=400)  # Handle other exceptions

@login_required  # Add if you need authentication for updating ratings
def rating_update(request, event_id, rating_id):
  """ Updates an existing rating for an event. """
  if request.method != 'PUT':
      return JsonResponse({'error': 'Method not allowed'}, status=405)
  try:
      event = Event.objects.get(pk=event_id)  # Ensure event exists
      rating = Rating.objects.get(pk=rating_id, event=event)  # Ensure rating belongs to event
  except (Event.DoesNotExist, Rating.DoesNotExist):
      return JsonResponse({'error': 'Rating not found'}, status=404)
  try:
      data = json.loads(request.body)
      nb_stars = data.get('nb_stars')
      if nb_stars is None or not isinstance(nb_stars, int) or nb_stars < 1 or nb_stars > 5:
          return JsonResponse({'error': 'Invalid nb_stars value'}, status=400)
      rating.nb_stars = nb_stars
      rating.save()
      return JsonResponse(rating.to_dict(), safe=False)
  except Exception as e:
      return JsonResponse({'error': str(e)}, status=400)  # Handle other exceptions

@login_required  # Add if you need authentication for deleting ratings
def rating_delete(request, event_id, rating_id):
  """ Deletes a rating for an event. """
  if request.method != 'DELETE':
      return JsonResponse({'error': 'Method not allowed'}, status=405)
  try:
      event = Event.objects.get(pk=event_id)  # Ensure event exists
      rating = Rating.objects.get(pk=rating_id, event=event)  # Ensure rating belongs to event
  except (Event.DoesNotExist, Rating.DoesNotExist):
      return JsonResponse({'error': 'Rating not found'}, status=404)
  rating.delete()
  return JsonResponse({'message': 'Rating deleted successfully'})
