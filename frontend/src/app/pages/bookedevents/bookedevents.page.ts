import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private eventService: EventService, private router: Router, private userService: UserService) {}


  ngOnInit(): void {
    this.userId = this.userService.getUserDataFromToken();
    this.ticketsList = this.userId.tickets;
    console.log(this.ticketsList);
    this.fetchBookedEvents();
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
