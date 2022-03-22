import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,ViewChild, OnChanges } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
  import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
  import { HttpHeaders ,HttpClient } from '@angular/common/http';
  import { UserService } from '../user.service';
  import { interval } from 'rxjs';
// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
import { Chart} from 'chart.js';
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
export class HomeResultsPage implements OnInit,OnChanges{
  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;
  stations:any;
  userDetails: Object;
  employees:any;
  fav: any;
  favoris: any;
  async logsToast(msg:any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ngOnChanges(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get(`${this.user.uri}/getstations`,httpOptions).subscribe(
      data => {
        this.stations = data;
        console.log(this.stations.length)
      },
      err => { 
        console.log(err);
        
      }
    );
    this.http.get(`${this.user.uri}/getemps`,httpOptions).subscribe(
      data => {
        this.employees = data;
        console.log(this.employees.length)
      },
      err => { 
        console.log(err);
      }
    );
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
    this.http.get(`${this.user.uri}/getstations`,httpOptions).subscribe(
      data => {
        this.stations = data;
        console.log(this.stations.length)
      },
      err => { 
        console.log(err);
        
      }
    );
    this.http.get(`${this.user.uri}/getemps`,httpOptions).subscribe(
      data => {
        this.employees = data;
        console.log(this.employees.length)
      },
      err => { 
        console.log(err);
      }
    );
  }

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
    private iab: InAppBrowser,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  
  }
  async ionViewDidEnter() {
    this.createBarChart();
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }
  openSite() {
    const browser = this.iab.create('https://www.tunisietelecom.tn/','_self',{location:'no'});
  }
  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Active'],
        datasets: [{
          label: 'Nombre des employés',
          data: [this.employees.length],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },{
          label: 'Nombres des stations',
          data: [this.stations.length],
          backgroundColor: 'rgb(222, 79, 31)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(222, 79, 31)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {beginAtZero: true
            },
          }]
        }
      }
    });
  }
}
