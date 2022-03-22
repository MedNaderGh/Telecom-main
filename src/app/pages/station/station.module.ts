import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { BarRatingModule } from "ngx-bar-rating";
import { StationPage } from './station.page';
import { IonicRatingModule } from 'ionic4-rating';
const routes: Routes = [
  {
    path: '',
    component: StationPage
  }
];

@NgModule({
  imports: [
    IonicRatingModule,
    ReactiveFormsModule,
    BarRatingModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StationPage]
})
export class StationPageModule {}
