import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpHeaders ,HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  contactForm: FormGroup;
  userDetails: any;
 
  constructor(private http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private user: UserService,
    private router:Router) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'email': ['', [Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)(\.[A-Za-z]{2,})$'), Validators.required]],
      'sujet': ['', [Validators.maxLength(70),  Validators.required]],
      'msg': ['', [Validators.maxLength(70),  Validators.required]],
      'name':['',],
      'id':['',],
    });
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get(`${this.user.uri}/userProfile`,httpOptions).subscribe(
      data => {
        this.userDetails = data;
        this.contactForm.get('id').setValue(this.userDetails._id);
        this.contactForm.get('name').setValue(this.userDetails.fullName);
        console.log(this.userDetails._id,this.userDetails.fullName);
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  envoyer(form: FormGroup) {
    this.http.post(`${this.user.uri}/message`,form.value).subscribe(
      res => {
        this.presentToast();
        this.contactForm.reset();
      },
      err => {
      this.erreurToast();
      }
    );
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Message envoyer avec succees vous allez recevoir un reponse via email dans la prochaine 48H',
      duration: 6000,
      showCloseButton: true,
      closeButtonText: "X"
    });
    toast.present();
  }
  async erreurToast() {
    const toast = await this.toastCtrl.create({
      message: 'Operation echouee',
      duration: 2000,
      showCloseButton: true,
      closeButtonText: "X"
    });
    toast.present();
  }
}
