import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturedeventsPageRoutingModule } from './featuredevents-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FeaturedeventsPage } from './featuredevents.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturedeventsPageRoutingModule,
    SharedModule
  ],
  declarations: [FeaturedeventsPage]
})
export class FeaturedeventsPageModule {}
