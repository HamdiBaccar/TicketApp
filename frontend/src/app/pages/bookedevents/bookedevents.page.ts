import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookedevents',
  templateUrl: './bookedevents.page.html',
  styleUrls: ['./bookedevents.page.scss'],
})
export class BookedeventsPage implements OnInit {

  bookedEvents: any[] = [];
  userId: any;
  ticketsList!: any[];
  events: any[] = [];
  bookedEventsDetails: any[] = [];


  constructor(private UserService: UserService ,private eventService: EventService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.UserService.getUserDataFromToken();
    this.userId.image_base64;
    console.log('User:', this.userId);
    this.ticketsList = this.userId.tickets;

    // Fetch events and booked events concurrently
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

  navigateToEventDetails(event: any): void {
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }


}