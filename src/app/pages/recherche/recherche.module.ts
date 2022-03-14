import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule,ActivatedRoute ,Router} from '@angular/router';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx'
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RecherchePage } from './recherche.page';

const routes: Routes = [
  {
    path: '',
    component: RecherchePage
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
  declarations: [RecherchePage]
})
export class RecherchePageModule {}
