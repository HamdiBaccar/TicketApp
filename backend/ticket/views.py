from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Ticket
from .serializers import TicketSerializer

@csrf_exempt
def ticket_list(request):
    if request.method == 'GET':
        tickets = Ticket.objects.all()
        serialized_tickets = TicketSerializer(tickets, many=True)
        return JsonResponse(serialized_tickets.data, safe=False)
    elif request.method == 'POST':
        ticket_data = JSONParser().parse(request)
        serialized_ticket = TicketSerializer(data=ticket_data)
        if serialized_ticket.is_valid():
            serialized_ticket.save()
            return JsonResponse(serialized_ticket.data, status=201)
        return JsonResponse(serialized_ticket.errors, status=400)

@csrf_exempt
def ticket_detail(request, pk):
    try:
        ticket = Ticket.objects.get(pk=pk)
    except Ticket.DoesNotExist:
        return JsonResponse({'error': 'Ticket not found'}, status=404)

    if request.method == 'GET':
        serialized_ticket = TicketSerializer(ticket)
        return JsonResponse(serialized_ticket.data)

    elif request.method == 'PUT':
        ticket_data = JSONParser().parse(request)
        serialized_ticket = TicketSerializer(ticket, data=ticket_data)
        if serialized_ticket.is_valid():
            serialized_ticket.save()
            return JsonResponse(serialized_ticket.data)
        return JsonResponse(serialized_ticket.errors, status=400)

    elif request.method == 'DELETE':
        ticket.delete()
        return JsonResponse({'message': 'Ticket deleted successfully'}, status=204)

