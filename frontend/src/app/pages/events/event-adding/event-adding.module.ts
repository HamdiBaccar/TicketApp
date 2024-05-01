import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventAddingPageRoutingModule } from './event-adding-routing.module';

import { EventAddingPage } from './event-adding.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule.forRoot(),
    FormsModule,
    IonicModule,
    EventAddingPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EventAddingPage]
})
export class EventAddingPageModule {}
