import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
  providers: [UserService]
})
export class HomePagePage implements OnInit {
  imagePreview: string = '';
  bookedEvents: any[] = [];
  userId: any;
  ticketsList!: any[];
  events: any[] = [];
  filteredEvents: any[] = []; // Array to store filtered events
  searchTerm: string = ''; // Variable to store search term
  bookedEventsDetails: any[] = [];

  constructor(private eventService: EventService, private router:Router, public UserService: UserService) {
    const navigation = this.router.getCurrentNavigation();
  if (navigation && navigation.extras.state) {
    this.imagePreview = navigation.extras.state['imagePreview'];
  }
   }
  ngOnInit(): void {
    this.fetchEvents();
    this.userId = this.UserService.getUserDataFromToken();
    console.log('User:', this.userId);
    this.ticketsList = this.userId.tickets;
    this.fetchBookedEvents();
    this.userId.image_base64;
    //////////////////////////////////////

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
    ////////////////////////////////////////
    
  }
  filterBookedEvents(): void {
    // Filter events based on booked event IDs
    this.bookedEventsDetails = this.events.filter(event => this.bookedEvents.includes(event.id));
    console.log('Booked Events Details:', this.bookedEventsDetails);
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
          // Ensure that this.ticketsList is initialized before this line
this.bookedEvents = events.filter(event => this.ticketsList?.includes(event.id));

          console.log('Booked Events:', this.bookedEvents);
        },
        (error: any) => {
          console.error('Error fetching events:', error);
        }
      );
  }


  filterEvents() {
    if (!this.searchTerm.trim()) {
      this.filteredEvents = []; // Clear filtered events when search term is empty
      return;
    }

    const searchTermLowerCase = this.searchTerm.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(searchTermLowerCase)
    );
  }
  selectEvent(event: any) {
    // Handle the selected event here
    console.log('Selected Event:', event);
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }


  navigateToEventDetails(event: any): void {
    this.router.navigate(['/event-details',event.id], { state: { event } });
  }




}
