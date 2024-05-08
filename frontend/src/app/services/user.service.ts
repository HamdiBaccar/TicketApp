import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  private hostIp: string = environment.DJANGO_HOST_IP;
  private apiUrl = `http://${this.hostIp}:8000/api/list/users/`;
  private updateUrl = `http://${this.hostIp}:8000/users/`;
  private url = `http://${this.hostIp}:8000/users/cart`;

  getUserDataFromToken(){
    const token = localStorage.getItem('token')
    if (!token) {
      console.log("Token not found")
    } else {
      try{
        let data = JSON.parse(window.atob(token.split('.')[1]))
        return data
      } catch (error) {
        console.error('Error parsing token:', error);
    }
    }
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}${userId}/`; // Adjust the URL according to your API endpoint
    return this.http.delete(url);
  }
  getBookedEventsFromUserId(userId: number): Observable<any> {
    return this.http.get<any>(`http://${this.hostIp}:8000/api/get_booked_events/${userId}/`);
  }
  addToCart(userId: number, eventId: number) {
    const url = `http://${this.hostIp}:8000/users/${userId}/add_to_cart/`;
    return this.http.post(url, { eventId });
  }
  getHostedEventsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`http://${this.hostIp}:8000/api/get_hosted_events/${userId}/`);
  }
  getCartItems(userId: number): Observable<Event[]> {
    const fullUrl = `${this.url}${userId}/`; // Append the userId to the URL
    return this.http.get<Event[]>(fullUrl);
  }

  }
