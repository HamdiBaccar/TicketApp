from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Feedback
from .serializers import FeedbackSerializer


@csrf_exempt
def feedback_list(request):
    if request.method == 'GET':
        feedbacks = Feedback.objects.all()
        serialized_feedbacks = FeedbackSerializer(feedbacks, many=True)
        return JsonResponse(serialized_feedbacks.data, safe=False)
    elif request.method == 'POST':
        feedback_data = JSONParser().parse(request)
        serialized_feedback = FeedbackSerializer(data=feedback_data)
        if serialized_feedback.is_valid():
            serialized_feedback.save()
            return JsonResponse(serialized_feedback.data, status=201)
        return JsonResponse(serialized_feedback.errors, status=400)

@csrf_exempt
def feedback_detail(request, pk):
    try:
        feedback = Feedback.objects.get(pk=pk)
    except Feedback.DoesNotExist:
        return JsonResponse({'error': 'Feedback not found'}, status=404)

    if request.method == 'GET':
        serialized_feedback = FeedbackSerializer(feedback)
        return JsonResponse(serialized_feedback.data)

    elif request.method == 'PUT':
        feedback_data = JSONParser().parse(request)
        serialized_feedback = FeedbackSerializer(feedback, data=feedback_data)
        if serialized_feedback.is_valid():
            serialized_feedback.save()
            return JsonResponse(serialized_feedback.data)
        return JsonResponse(serialized_feedback.errors, status=400)

    elif request.method == 'DELETE':
        feedback.delete()
        return JsonResponse({'message': 'Feedback deleted successfully'}, status=204)