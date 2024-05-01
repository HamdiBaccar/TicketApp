import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'event-booking',
    loadChildren: () => import('./event-booking/event-booking.module').then( m => m.EventBookingPageModule)
  },
  {
    path: 'event-adding',
    loadChildren: () => import('./event-adding/event-adding.module').then( m => m.EventAddingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
