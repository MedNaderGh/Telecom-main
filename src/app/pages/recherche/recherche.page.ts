import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';            
import { UserService } from 'src/app/pages/user.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.page.html',
  styleUrls: ['./recherche.page.scss'],
})
export class RecherchePage implements OnInit {
  mot: any;
  reduction: Number=0;
  partenaire: any;
  categorie: any;
  distance: Number=0;
  promotion: any;
  lng: any;
  lat: any;
  error:boolean=false;
  c: any=0;
  constructor( private router: Router,private geolocation: Geolocation,
    private route: ActivatedRoute,public http: HttpClient,private user: UserService) {
      this.mot = this.route.snapshot.queryParams['mot'];
      if(!this.mot) this.mot='';
      this.distance = this.route.snapshot.queryParams['distance'];
      if(!this.distance) this.distance=0;
      this.categorie = this.route.snapshot.queryParams['categorie'];
      if(!this.categorie) this.categorie='';
      this.partenaire = this.route.snapshot.queryParams['partenaire'];
      if(!this.partenaire) this.partenaire='';
      this.reduction = this.route.snapshot.queryParams['reduction'];
      if(!this.reduction) this.reduction=0;
      console.log(this.mot,this.distance,this.categorie,this.partenaire,this.reduction);
     }

  ngOnInit() {
    let self=this; 
    this.geolocation.getCurrentPosition({  maximumAge: 300000,timeout: 30000, enableHighAccuracy: true }).then((resp) => {
      self.lat= resp.coords.latitude;
      self.lng= resp.coords.longitude;
      console.log(self.lat);
      console.log(self.lng);
      }).catch((error) => {
      console.log('Error getting location', error);
      })
    this.http.get(`${this.user.uri}/getprom`).subscribe(data => {
      this.promotion = data;
      console.log(this.promotion);
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
    
  }
  dist(ln,la){
    ln=parseFloat(ln);
    la=parseFloat(la);
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((la-this.lat) * p) / 2 + c(this.lat * p) *c((la) * p) * (1 - c(((ln- this.lng) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    dis=Math.round(dis);
return dis;
  }
  onOrderDelete(proID: any) {
    this.router.navigate(['/promo'], { queryParams: { page: proID } });
  }
  seter(){
    if (this.error === false) {this.error=true}
    else{this.error=false}
  }
}
