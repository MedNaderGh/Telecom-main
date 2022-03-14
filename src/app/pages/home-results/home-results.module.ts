import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PopmenuComponent } from './../../components/popmenu/popmenu.component';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';

import { HomeResultsPage } from './home-results.page';

const routes: Routes = [
  {
    path: '',
    component: HomeResultsPage
  }
];

@NgModule({
  providers: [
    Geolocation,
    NativeGeocoder
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeResultsPage, PopmenuComponent]

})
export class HomeResultsPageModule {}
