import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userDetails: any;
  public onRegisterForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private router: Router,
    private user: UserService,
    public http: HttpClient,
    private fb: FormBuilder
    
    ) { }

  ngOnInit() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get(`${this.user.uri}/userProfile`,httpOptions).subscribe(
      data => {
        this.userDetails = data;
        
        this.onRegisterForm.get('fullName').setValue(this.userDetails.fullName);
        this.onRegisterForm.get('email').setValue(this.userDetails.email);
        this.onRegisterForm.get('dnaiss').setValue(this.userDetails.datenaiss);
        this.onRegisterForm.get('tel').setValue(this.userDetails.Numtel);
        return this.userDetails;
      },
      err => { 
        console.log(err);
        
      }
    );
    
    this.onRegisterForm= this.fb.group({
      fullName: ['', Validators.required ],
     /* email: ['', Validators.required],*/
     email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)(\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', Validators.required ],
      password2: ['',],
      dnaiss: [null, Validators.compose([
        Validators.required
      ])],
      tel: [null, Validators.compose([
        Validators.required,Validators.minLength(8),Validators.maxLength(12)
      ])]
    },{validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.password2.value;

  return pass === confirmPass ? null : { notSame: true }     
}
  async sendData(name,email,mdp,dnaiss,tel,id) {
    if (mdp) {    const obj = {
      name: name,
      email: email,
      mdp: mdp,
      dnaiss: dnaiss,
      tel: tel
    };
    console.log(obj)
    this.http.post(`${this.user.uri}/editProfile/`+`${id}`,obj).subscribe(res => {
      this.logeToast();
      this.ngOnInit();
    }, err => {
      this.logrToast();
      this.ngOnInit();
    });
  }else{
      const obj = {
        name: name,
        email: email,
        dnaiss: dnaiss,
        tel: tel
      };
      this.http.post(`${this.user.uri}/editProfile2/`+`${id}`,obj).subscribe(res => {
        this.logeToast();
        this.ngOnInit();
      }, err => {
        this.logrToast();
        this.ngOnInit();
      });
      console.log(obj)
    }
    
  }
  async logeToast() {
    const toast = await this.toastCtrl.create({
      message: 'Modification reussi veuillez utilisez vous nouvelles cordonnes lors de ta prochaine connexion ',
      duration: 4000
    });
    toast.present();
  }
  async logrToast() {
    const toast = await this.toastCtrl.create({
      message: 'operation echouée',
      duration: 2000
    });
    toast.present();
  }
}
