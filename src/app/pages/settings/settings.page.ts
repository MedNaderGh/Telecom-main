import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { HttpHeaders,HttpClient  } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lng: any;
lat:any;
  userDetails: any;
  promotion: any;
  favoris: any;

  constructor(public navCtrl: NavController,private user: UserService,
    private router: Router,public http: HttpClient,private geolocation: Geolocation,public alertCtrl: AlertController,public toastCtrl:ToastController) { }

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
    this.http.get(`${this.user.uri}/getprom`).subscribe(data => {
      this.promotion = data;
      console.log(this.promotion);
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
    this.http.get(`${this.user.uri}/getfav`).subscribe(data => {
      this.favoris=data;
      console.log(this.favoris,'favoris');
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
    this.geolocation.getCurrentPosition({  maximumAge: 300000,timeout: 30000, enableHighAccuracy: true }).then((resp) => {
      this.lat= resp.coords.latitude;
      this.lng= resp.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
      }).catch((error) => {
      console.log('Error getting location', error);
      })
  }
  async delete(id) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmer suppression',
      message: 'Voulez vous supprimer cette promotion de la liste favoris',
      buttons: [
        {
          text: 'Anuuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.http.delete(`${this.user.uri}/delfav/`+`${id}`).subscribe(res => {
              this.suc();
              this.ngOnInit();
            }, err => {
              this.err();
            });

          }
        }
      ]
    });
    await alert.present();}
    async err() {
      const toast = await this.toastCtrl.create({
        message: 'Operation echouée ',
        duration: 4000
      });
      toast.present();
    }
    async suc() {
      const toast = await this.toastCtrl.create({
        message: 'Promotion supprimée de favoris 💔',
        duration: 2000
      });
      toast.present();
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
  editProfile() {
    this.navCtrl.navigateForward('edit-profile');
  }
  onOrderDelete(proID: any) {
    this.router.navigate(['/promo'], { queryParams: { page: proID } });
  }
  logout() {
    this.navCtrl.navigateRoot('/');
  }

}
