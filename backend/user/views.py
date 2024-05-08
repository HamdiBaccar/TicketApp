from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate
import logging
from django.contrib.auth.hashers import check_password       
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import BasePermission
from superuser.models import SuperUser
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import jwt
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


class UserRegisterAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            if User.objects.filter(email=email).exists():
                return Response({"message": "User with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.POST.get('image_base64'):
        image_base64 = request.POST['image_base64']
        try:
            user_id = int(request.POST.get('user_id'))  # Assuming you pass user ID along with the image
            user = User.objects.get(pk=user_id)
        except (ValueError, User.DoesNotExist):
            return JsonResponse({'error': 'Invalid user ID'}, status=400)
        
        # Decode the base64 string and save it as the image file
        format, imgstr = image_base64.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr), name=f"{user.username}_profile_image.{ext}")
        user.image_base64.save(f"{user.username}_profile_image.{ext}", data, save=True)
        
        return JsonResponse({'success': 'Image uploaded successfully'})
    else:
        return JsonResponse({'error': 'No image data provided'}, status=400)
    
class UserLoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        print(email)
        print(password)
        try:
            user = User.objects.get(email=email)
            print("user password: ",user.password)
        except User.DoesNotExist:
            user = None

        if user is not None and check_password(password, user.password):
            print("User data:", user.__dict__)
            # Token payload
            payload = {
            'id': user.pk,
            'username': user.username,
            'email': user.email,
            'password': user.password,  # Note: Be cautious with including hashed passwords in the payload
            'age': user.age,
            'field_of_interest': user.field_of_interest,
            'phone': user.phone,
            'governorate': user.governorate,
            'is_verified': user.is_verified,
            'is_admin': user.is_admin,
            'cart': user.cart,
            'image_base64': user.image_base64,
            'mfa_enabled': user.mfa_enabled,
            'mfa_secret_key': user.mfa_secret_key,
            'bookedEvents': user.bookedEvents,
            'hostedEvents': user.hostedEvents,
            'tickets': user.tickets
        }



            # Generate JWT token
            token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
            
            return Response({'token': token}, status=status.HTTP_200_OK)
            # return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            print("Authentication failed for email:", email)
            print("Authentication failed for password:", password)
            return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_hosted_events(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    hosted_events = user.hostedEvents
    return Response({'hosted_events': hosted_events})

@api_view(['GET'])
def get_booked_events(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    booked_events = user.bookedEvents
    return Response({'booked_events': booked_events})
class UserListView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def add_event_to_hosted_events(request, user_id):
    user = get_object_or_404(User, id=user_id)
    event_id = request.data.get('event_id')  # Use request.data to access JSON data
    
    if not event_id:
        return Response({'error': 'Event ID not provided'}, status=400)

    user.hostedEvents.append(event_id)
    user.save()
    return Response({'message': 'Event added to hosted events successfully'}, status=200)
      
class UserDetailView(APIView):
    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
#
# class UserLoginAPIView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#
#         # Authenticate user
#         user = authenticate(email=email, password=password)
#
#         if user is None:
#             return Response({'error': 'Email or password is incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
#
#         # Token payload
#         payload = {
#             'email': user.email,
#             'firstname': user.first_name,
#             'lastname': user.last_name,
#             'username': user.username,
#             'user_id': user.id
#         }
#
#         # Generate JWT token
#         token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
#
#         return Response({'token': token}, status=status.HTTP_200_OK)

class UserLogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
class UserListCreateAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            if User.objects.filter(email=email).exists():
                return Response({"message": "User with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserUpdateView(APIView):
    def put(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
##################################################################################
@api_view(['POST'])
def add_to_cart(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    event_id = request.data.get('eventId')
    if event_id is None:
        return Response({"message": "Event ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    # Convert event ID to string
    event_id_str = str(event_id)

    # Initialize cart as an empty dictionary if it's not already
    if not isinstance(user.cart, dict):
        user.cart = {}

    # Check if the event ID already exists in the cart
    if event_id_str in user.cart:
        return Response({"message": "Event already exists in the cart"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Add the event to the cart with quantity 1
    user.cart[event_id_str] = {'quantity': 1}
    user.save()
    
    return Response({"message": "Event added to cart successfully"}, status=status.HTTP_201_CREATED)
@api_view(['GET'])
def get_cart(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    cart_data = user.cart  # Assuming cart is a JSONField in your User model

    return Response(cart_data)

###########################################################################        
class UserRetrieveUpdateDestroyAPIView(APIView):
    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User updated successfully"})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User updated successfully"})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({"message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)


