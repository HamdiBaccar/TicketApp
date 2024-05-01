import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturedeventsPage } from './featuredevents.page';
import { EventDetailsPage } from '../events/event-details/event-details.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturedeventsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturedeventsPageRoutingModule {}
