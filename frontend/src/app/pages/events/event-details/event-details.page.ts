import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import {CartService} from "../../../services/cart.service";
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  
  userId:any;
event:any;
  events: any[] = [];
  eventId!: number;
  foundEvent!:any
  ticketsSold: any;
  ticketsLeft!: number;
  addToCartButtonClicked: boolean = false;
  addToWishlistButtonClicked: boolean = false;
  showMessage: boolean = false;
  message_displayed!: string
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, private cartService: CartService, private router: Router,private userService:UserService) { }

  ngOnInit(): void {
    // Get the eventId from the route parameters
    this.eventId = +this.activatedRoute.snapshot.params['eventId']; // Convert to number using +
    this.event = history.state.event;
    // Fetch events and find the event with matching eventId
    this.eventService.getEvents().subscribe(
      (events: any[]) => {
        this.events = events;
        // Find the event with matching eventId
        const foundEvent = this.events.find(event => event.id === this.eventId);
        if (foundEvent) {
          console.log('Found Event:', foundEvent);
          this.foundEvent = foundEvent
        } else {
          console.log(`Event with id ${this.eventId} not found.`);
        }
      },
      (error: any) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  calculateTicketsLeft(): any {
    if (this.foundEvent) {
      const availableTickets = this.foundEvent.available_tickets;
      const ticketsSold = this.foundEvent.people_attending.length;
      this.ticketsSold = ticketsSold;
      this.ticketsLeft = availableTickets - ticketsSold;
    }
    return this.ticketsLeft
  }

  addToCartClicked() {
    this.addToCartButtonClicked = !this.addToCartButtonClicked;
    const eventIdParam = this.activatedRoute.snapshot.paramMap.get('eventId');
const eventId = eventIdParam ? parseInt(eventIdParam, 10) : 0; // Default value of 0

    const userId = this.userService.getUserDataFromToken();
    
    // Add the event to the user's cart
    this.userService.addToCart(userId.id, eventId).subscribe(
      (response) => {
        console.log('Event added to cart:', response);
        // Handle success (e.g., display success message)
      },
      (error) => {
        console.error('Error adding event to cart:', error);
        // Handle error (e.g., display error message)
      }
    );
  }
  
  

  toggleWishlist() {
    // Toggle the addToWishlistButtonClicked flag
    this.addToWishlistButtonClicked = !this.addToWishlistButtonClicked;
    if (this.addToWishlistButtonClicked==true)
      this.message_displayed = "Added to wishlist!"
    else
      this.message_displayed = "Removed from wishlist!"

    // Show message "Added to wishlist!" for 2 seconds
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }

  getColor(): string {
    if (this.foundEvent && this.foundEvent.status === 'upcoming') {
      return '#45d81cd4'; // Set background color to green for 'upcoming'
    } else if (this.foundEvent && this.foundEvent.status === 'finished') {
      return '#ff0257d4'; // Set background color to red for 'finished'
    } else {
      return '#45d81cd4'; // Default background color (transparent)
    }
  }

  navigateToBooking() {
  // Navigate to the event-booking page
  this.router.navigate(['/book-event']);
}




}
