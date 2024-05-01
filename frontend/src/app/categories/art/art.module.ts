import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtPageRoutingModule } from './art-routing.module';

import { ArtPage } from './art.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ArtPageRoutingModule
  ],
  declarations: [ArtPage]
})
export class ArtPageModule {}
