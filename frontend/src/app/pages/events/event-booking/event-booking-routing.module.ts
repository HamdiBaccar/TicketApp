import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventBookingPage } from './event-booking.page';

const routes: Routes = [
  {
    path: '',
    component: EventBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventBookingPageRoutingModule {}
