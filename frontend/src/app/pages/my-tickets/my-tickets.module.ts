import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTicketsPageRoutingModule } from './my-tickets-routing.module';

import { MyTicketsPage } from './my-tickets.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    MyTicketsPageRoutingModule
  ],
  declarations: [MyTicketsPage]
})
export class MyTicketsPageModule {}
