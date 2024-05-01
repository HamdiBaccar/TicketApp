import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventBookingPageRoutingModule } from './event-booking-routing.module';

import { EventBookingPage } from './event-booking.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    EventBookingPageRoutingModule
  ],
  declarations: [EventBookingPage]
})
export class EventBookingPageModule {}
