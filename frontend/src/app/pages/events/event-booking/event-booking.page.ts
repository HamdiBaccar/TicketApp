import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.page.html',
  styleUrls: ['./event-booking.page.scss'],
})
export class EventBookingPage implements OnInit {

  number = 1; // Initial value

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
  }

}
