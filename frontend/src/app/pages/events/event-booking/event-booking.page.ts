import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Event } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.page.html',
  styleUrls: ['./event-booking.page.scss'],
})
export class EventBookingPage implements OnInit {
  events: any[] = [];
  eventsInCart: any[] = [];
  userId:any;
  cartPayload:any;
  cartItems: any = {};
  number = 1; // Initial value
  item = 1;
  TotalPrice:any;

  constructor(private userService: UserService,private eventService:EventService) {}
decrement() {
  if (this.number > 1) {
    this.number--;
  }
}

increment() {
  // You can set a maximum limit here (e.g., if (this.number < 10))
  this.number++;
}

ngOnInit() {
  this.userId = this.userService.getUserDataFromToken();
  this.userId.image_base64;
  this.getData(); // Call the getData method on component initialization
  this.getTotalPrice();
}
getData() {
  forkJoin([
    this.eventService.getEvents(),
    this.userService.getCartItems(this.userId.id)
  ]).subscribe(
    ([events, cartItems]) => {
      this.events = events;
      console.log("events :", events);
      this.cartItems = cartItems;
      console.log("cart items :", cartItems);
      this.getEventsInCart(); // Call function to filter events for items in the cart
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
  getEvents() {
    this.eventService.getEvents().subscribe(
      (events) => {
        this.events = events;
        console.log("events :",events)
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  getCartItems() {
    this.userService.getCartItems(this.userId.id).subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        console.log("cart items :",cartItems);
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getEventsInCart() {
    // Filter events array based on IDs present in cartItems
    this.eventsInCart = this.events.filter(event => this.cartItems.hasOwnProperty(event.id));
    console.log("Events in cart with details:", this.eventsInCart);
  }
  increaseTicketQuantity(event: any): void {
    // Initialize quantity to 1 if it's not already set
    if (!event.quantity) {
        event.quantity = 1;
    }
    // Increase ticket quantity for the specified event
    event.quantity++;
    // Update ticket price
    this.updateTicketPrice(event);
}

decreaseTicketQuantity(event: any): void {
    // Decrease ticket quantity for the specified event
    if (event.quantity && event.quantity > 1) {
        event.quantity--;
        // Update ticket price
        this.updateTicketPrice(event);
    }
}

updateTicketPrice(event: any): void {
    // Update ticket price based on quantity
    // Assuming event.ticket_unit_price is the initial price per ticket
    event.total_price = event.ticket_unit_price * event.quantity;
}

getTotalPrice(): number {
  let totalPrice = 0;
  this.eventsInCart.forEach(event => {
      // Assuming event.total_price is the total price for this event
      totalPrice += event.total_price || 0;
  });
  return totalPrice;
}
}
