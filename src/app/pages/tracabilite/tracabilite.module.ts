import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';

import { TracabilitePage } from './tracabilite.page';

const routes: Routes = [
  {
    path: '',
    component: TracabilitePage
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
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TracabilitePage]
})
export class TracabilitePageModule {}
