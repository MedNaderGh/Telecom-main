import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
@Component({
  selector: 'app-test-debit',
  templateUrl: './test-debit.page.html',
  styleUrls: ['./test-debit.page.scss'],
})
export class TestDebitPage implements OnInit {
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
  }

}
