import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log()
  }
  selectedMethod: string = 'PayPal'; // Variable to hold the selected payment method

  // Function to handle selecting payment method
  selectMethod(method: string) {
    this.selectedMethod = method;
  }
}
