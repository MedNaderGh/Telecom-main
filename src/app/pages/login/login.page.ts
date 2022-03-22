import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  public onLoginForm: FormGroup;

  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private user: UserService,
    private router:Router
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  serverErrorMessages: string;
  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': ['', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)(\.[A-Za-z]{2,})$'), Validators.required]],
      'password': [null, Validators.compose([
        Validators.required
      ])],

    });
    if(this.user.isLoggedIn())
    this.router.navigate(['/home-results']);
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'mot de pass oublié?',
      message: 'Entrer ton e-mail pour resevoir un e-mail de restauration',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm annulation');
          }
        }, {
          text: 'Confirmer',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email envoyé.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }
  /*login(form : FormGroup){
    this.user.login(form.value).subscribe(
      res => {
        this.user.setToken(res['token']);
        this.router.navigateByUrl('/test');
        this.logsToast()
      },
      err => {
        this.serverErrorMessages = err.error.message;
        this.logeToast()
      }
    );
  }*/
  data: any;
  message='';
  login() {
    console.log(this.onLoginForm.value);
    this.http.post(`${this.user.uri}/signin`,this.onLoginForm.value).subscribe(res=> {
      this.data = res;
      localStorage.setItem('jwtToken', this.data.token);
      this.router.navigate(['/home-results']);
    }, err => {
      console.log(err)
      this.logeToast(err.error.msg)
    });
  }
  async logsToast() {
    const toast = await this.toastCtrl.create({
      message: 'login avec succes',
      duration: 2000
    });
    toast.present();
  }
  async logeToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home-results');
  }

}
