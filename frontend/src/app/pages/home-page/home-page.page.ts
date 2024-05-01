import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  providers: [UserService]
})
export class HomePagePage implements OnInit {
  bookedEvents: any[] = [];
  userId: any;
  ticketsList!: any[];
  events: any[] = [];


  constructor(private eventService: EventService, private router:Router, public UserService: UserService) { }
  ngOnInit(): void {
    this.fetchEvents();
    this.userId = this.UserService.getUserDataFromToken();
    console.log('User:', this.userId);
    this.ticketsList = this.userId.tickets;
    this.fetchBookedEvents();
  }

  fetchEvents(): void {
    this.eventService.getEvents()
      .subscribe(
        (events: any[]) => {
          this.events = events;
          console.log('Events:', this.events);
        },
        (error: any) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  fetchBookedEvents(): void {
    this.eventService.getEvents()
      .subscribe(
        (events: any[]) => {
          // Filter events based on ticket IDs
          this.bookedEvents = events.filter(event => this.ticketsList.includes(event.id));
          console.log('Booked Events:', this.bookedEvents);
        },
        (error: any) => {
          console.error('Error fetching events:', error);
        }
      );
  }





  navigateToEventDetails(eventId: number) {
    this.router.navigate(['/event-details', eventId]); // Navigate to event-details page with event ID
  }




}
