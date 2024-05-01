import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetsPageRoutingModule } from './meets-routing.module';

import { MeetsPage } from './meets.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MeetsPageRoutingModule
  ],
  declarations: [MeetsPage]
})
export class MeetsPageModule {}
