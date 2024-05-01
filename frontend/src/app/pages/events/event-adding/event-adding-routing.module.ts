import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventAddingPage } from './event-adding.page';

const routes: Routes = [
  {
    path: '',
    component: EventAddingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventAddingPageRoutingModule {}
