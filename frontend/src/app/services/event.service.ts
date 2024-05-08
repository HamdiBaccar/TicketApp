import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private hostIp: string = environment.DJANGO_HOST_IP;

  private eventsUrl = `http://${this.hostIp}:8000/events/`;
  private apiUrl = `http://${this.hostIp}:8000/events/`;
  private CreateEventUrl = `http://${this.hostIp}:8000/create/events/`;



  constructor(private http: HttpClient) { }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl);
  }

  getEventsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}?category=${category}`;
    return this.http.get<any[]>(url);
  }

  getEventDetails(eventId: number): Observable<any> {
    const url = `${this.apiUrl}${eventId}`;
    return this.http.get<any>(url);
  }
  createEvent(eventData: any): Observable<any> {
    return this.http.post<any>(this.CreateEventUrl, eventData);
  }
}
