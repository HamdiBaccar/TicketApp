import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedeventsPageRoutingModule } from './bookedevents-routing.module';

import { BookedeventsPage } from './bookedevents.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BookedeventsPageRoutingModule
  ],
  declarations: [BookedeventsPage]
})
export class BookedeventsPageModule {}
