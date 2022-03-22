import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker ,icon} from 'leaflet';
import * as L from 'leaflet';
import { Router } from "@angular/router";
import { NavController} from '@ionic/angular';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from '../user.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
/*const iconRetinaUrl = 'leaflet/dist/images/marker-icon-2x.png';
const iconUrl = 'leaflet/dist/images/marker-icon.png';
const shadowUrl = 'leaflet/dist/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
//L.marker.prototype.options.icon = iconDefault;*/

// Assign the imported image assets before you do anything with Leaflet.
var blueicon = L.icon({
  iconRetinaUrl: 'assets/img/marker-icon-2x.png',
  iconUrl: 'assets/img/marker-icon.png',
  shadowUrl: 'assets/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
@Component({
  selector: 'app-tracabilite',
  templateUrl: './tracabilite.page.html',
  styleUrls: ['./tracabilite.page.scss'],
})
export class TracabilitePage implements OnInit {
  
  map: Map;
  stations: any;
  lat:any;
  lng:any;
  constructor(    private user: UserService,
    public http: HttpClient,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder,private router: Router,public navCtrl: NavController,) { }

  ngOnInit() {
    this.loadmap();
    
  }
  loadmap() {
    setTimeout(() => {
      this.map = new Map('map').setView([34.009508, 9.4289231], 7);
      this.map.invalidateSize();
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map',
        maxZoom: 18
      }).addTo(this.map);
      this.http.get(`${this.user.uri}/getstations`).subscribe(data => {
        this.stations = data;
        for(let x of this.stations){
          var geojsonMarkerOptions = {
            icon:blueicon,
            myCustomId: x,
          };
        L.marker([x.Lat
          , x.Lng],{icon:blueicon}).addTo(this.map).on("click", e => {
            this.router.navigateByUrl("/station",{ state: x });
          });
        }
      });
      this.geolocation.getCurrentPosition({  maximumAge: 300000,timeout: 30000, enableHighAccuracy: true }).then((resp) => {
        this.lat= resp.coords.latitude;
        this.lng= resp.coords.longitude;
        console.log(this.lat);
        console.log(this.lng);
        L.marker([this.lat, this.lng],{icon:blueicon}).addTo(this.map).bindPopup('Tu es ici').openPopup();
        }).catch((error) => {
        console.log('Error getting location', error);
        })
        
    }, 50);
  }
goToRegister(){
  this.navCtrl.navigateRoot('/');
}
}