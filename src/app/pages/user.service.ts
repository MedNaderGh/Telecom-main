import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  uri = 'http://localhost:3333/user';
  userDetails: Object;
  constructor(private http: HttpClient, public toastController: ToastController,public navCtrl: NavController,private router:Router) { }
  addUser(name: String, email: String, password: String) {
    const obj = {
      name: name,
      email: email,
      password: password
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
    .subscribe(res => {
      this.presentToast()
      this.goToLogin()
   }, errorResp => {
    this.erreurToast()
   });
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inscription reussi',
      duration: 2000
    });
    toast.present();
  }
  async erreurToast() {
    const toast = await this.toastController.create({
      message: 'email deja existe',
      duration: 2000
    });
    toast.present();
  }
  login(authCredentials) {
    return this.http.post(`${this.uri}/authenticate`, authCredentials,this.noAuthHeader);
  }
  postUser(user: User){
    return this.http.post(`${this.uri}/register`,user,this.noAuthHeader);
  }
  getUserProfile() {
    return this.http.get(`${this.uri}/userProfile`);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  deleteToken() {
    localStorage.removeItem('jwtToken');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
userloged()
{
  let httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };
  this.http.get(`${this.uri}/userProfile`,httpOptions).subscribe(
    data => {
      this.userDetails = data;
      return this.userDetails;
    },
    err => { 
      console.log(err);
      
    }
  );
}
}
 /* login(email: String, password: String){
    const obj = {
      email: email,
      password: password
    };
  this.http.post(`${this.uri}/login`,obj)
  .subscribe(
    res=>{this.router.navigate(['/home-results'])
    this.logsToast()} ,
    errorResp=>this.logeToast()
  )
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inscription reussi',
      duration: 2000
    });
    toast.present();
  }
  async erreurToast() {
    const toast = await this.toastController.create({
      message: 'email deja existe',
      duration: 2000
    });
    toast.present();
  }
  async logsToast() {
    const toast = await this.toastController.create({
      message: 'login avec succes',
      duration: 2000
    });
    toast.present();
  }
  async logeToast() {
    const toast = await this.toastController.create({
      message: 'login ou mot de passe est incorrecte',
      duration: 2000
    });
    toast.present();
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
  goToInscription() {
    this.navCtrl.navigateRoot('/registry');
  }
}*/