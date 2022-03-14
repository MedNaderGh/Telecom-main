import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
  import { HttpHeaders ,HttpClient } from '@angular/common/http';
  import { UserService } from '../user.service';
  import { interval } from 'rxjs';
// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { find } from 'rxjs/operators';
@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeResultsPage implements OnInit{
  lat:any;
  lng:any;
  promotion: any;
  r:any;
  km:any=60
  show:boolean=true
  city: any;
  bouton:any="heart-empty";
  country: string;
  error:boolean=false;
  userDetails: Object;
 
  fav: any;
  favoris: any;
  async logsToast(msg:any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  
   
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get(`${this.user.uri}/userProfile`,httpOptions).subscribe(
      data => {
        this.userDetails = data;
      },
      err => { 
        console.log(err);
        
      }
    );
    let self=this;  
    this.http.get(`${this.user.uri}/getprom`).subscribe(data => {
      this.promotion = data;
      console.log(this.promotion);
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
     console.log(this.promotion);
      this.geolocation.getCurrentPosition({  maximumAge: 300000,timeout: 30000, enableHighAccuracy: true }).then((resp) => {
      self.lat= resp.coords.latitude;
      self.lng= resp.coords.longitude;
      console.log(self.lat);
      console.log(self.lng);
      }).catch((error) => {
      console.log('Error getting location', error);
      })
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    
    this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
      .then((result: NativeGeocoderResult[]) => this.city=JSON.stringify(result[0]))
      .catch((error: any) => console.log(error));
    }
    check(ln,la){
      ln=parseFloat(ln);
      la=parseFloat(la);
      let p = 0.017453292519943295;
      let c = Math.cos;
      let a = 0.5 - c((la-this.lat) * p) / 2 + c(this.lat * p) *c((la) * p) * (1 - c(((ln- this.lng) * p))) / 2;
      let dis = (12742 * Math.asin(Math.sqrt(a)));
      if (dis<this.km) return true;
      else return false;
    }
    distance(ln,la){
      ln=parseFloat(ln);
      la=parseFloat(la);
      let p = 0.017453292519943295;
      let c = Math.cos;
 
      let a = 0.5 - c((la-this.lat) * p) / 2 + c(this.lat * p) *c((la) * p) * (1 - c(((ln- this.lng) * p))) / 2;
      let dis = (12742 * Math.asin(Math.sqrt(a)));
      dis=Math.round(dis);
return dis;
    }
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private user: UserService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }


  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }
  onOrderDelete(proID: any) {
    this.router.navigate(['/promo'], { queryParams: { page: proID } });
  }
  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }
  test(proid: any,userid: any){
    const obj = {
      proid: proid,
      userid: userid
    };
    console.log(obj)
    this.http.post(`${this.user.uri}/addfav`,obj).subscribe(res => {
      if (res=="erreur") this.err();
  else this.ngOnInit();;
   }, err=> {
    console.log("existe")
   });
   
  }
del(proid: any,userid: any){
  const obj = {
    proid: proid,
    userid: userid
  };
  console.log("test")
  this.http.post(`${this.user.uri}/isfav`,obj).subscribe(res => {
    this.fav=res;
     }, errorResp=> {
      console.log("false")
     });
     this.http.delete(`${this.user.uri}/delfav`+`${this.fav._id}`).subscribe(res => {
    this.ngOnInit();
  }, err => {
    console.log("false")  
  });

}
async err() {
  const toast = await this.toastCtrl.create({
    message: 'Cette promotion est deja dans la liste favoris ',
    duration: 2000
  });
  toast.present();
}
async suc() {
  const toast = await this.toastCtrl.create({
    message: 'Promotion ajoutée au favoris ❤️',
    duration: 2000
  });
  toast.present();
}
search(msg: any)
{console.log(msg);}
test2(idp:any,idu:any){
  this.http.get(`${this.user.uri}/getfav`).subscribe(data => {
    this.favoris=data;
    let found:boolean=false;
    for(let x of this.favoris){
      if (x.id_prom === idp && x.id_user === idu)
      {found=true;}
    }
    if(found===true){this.bouton="heart-empty"
    let id:any
    for(let x of this.favoris){
      if (x.id_prom === idp && x.id_user === idu)
      {id=x._id;}
    }
    this.http.delete(`${this.user.uri}/delfav/`+`${id}`).subscribe(res => {
      
    }, err => {
      this.err();
    });
  }
    else {this.bouton="heart";
  
    const obj = {
      proid: idp,
      userid: idu
    };
    console.log(obj)
    this.http.post(`${this.user.uri}/addfav`,obj).subscribe(res => {
      if (res=="erreur") this.err();
  else this.ngOnInit();;
   }, err=> {
    console.log("existe")
   });
  }
    return true;
    
  }, err => {
    if(err.status === 401) {
      console.log("erreur");
    }
  });
  this.ngOnInit();
}

tou(idp:any,idu:any)
{ console.log("test")
let found:boolean
    this.http.get(`${this.user.uri}/getfav`).subscribe(data => {
      this.favoris=data;
});

for(let y of this.favoris){
  if (y.id_prom === idp && y.id_user === idu)
  {found=true; console.log(idp,idu)
  }else{found=false}
}
console.log(found)
if(found!=true){return "heart-empty"}
else{return "heart"}
}
change(){
  if (this.km===60){this.km=1000}
  else{this.km=60}
}
seter(){
  if (this.error === false) {this.error=true}
  else{this.error=false}
}
}
