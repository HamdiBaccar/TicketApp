import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.page.html',
  styleUrls: ['./my-tickets.page.scss'],
})
export class MyTicketsPage implements OnInit {
  
  bookedEvents: any[] = [];
  events: any[] = [];
  userId: any;
  ticketsList!: any[];
  bookedEventsDetails: any[] = [];
  constructor(public UserService: UserService,private eventService:EventService) { }

  ngOnInit() {
    this.bookedEventsDetails;
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
    this.ticketsList = this.userId.tickets;
    forkJoin({
      events: this.eventService.getEvents(),
      bookedEvents: this.UserService.getBookedEventsFromUserId(this.userId.id)
    }).subscribe(
      ({ events, bookedEvents }) => {
        this.events = events;
        console.log('Events:', this.events);

        // Store booked events in bookedEvents array
        this.bookedEvents = bookedEvents.booked_events;
        console.log('Booked events:', this.bookedEvents);

        // Filter events based on booked event IDs
        this.filterBookedEvents();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  filterBookedEvents(): void {
    // Filter events based on booked event IDs
    this.bookedEventsDetails = this.events.filter(event => this.bookedEvents.includes(event.id));
    console.log('Booked Events Details:', this.bookedEventsDetails);
  }
}
