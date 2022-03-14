import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.page.html',
  styleUrls: ['./partenaires.page.scss'],
})
export class PartenairesPage implements OnInit {
  partenaire: any;
  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public user:UserService
  ) { }

  ngOnInit() {
    this.http.get(`${this.user.uri}/getpart`).subscribe(data => {
      this.partenaire = data;
      console.log(this.partenaire);
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
  }

}
