import { Component,  OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { Observable, Subscription} from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BarRatingModule } from 'ngx-bar-rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {
 _trialEndsAt;
 _diff: number;
 _days: number;
 _hours: number;
 _minutes: number;
   _seconds: number;
  value: any;
  test: any;
  userDetails: any;
  count: any;
  commentForm: FormGroup;
  cmnt: Object;
  constructor(    private router: Router,
    private route: ActivatedRoute,public http: HttpClient,private user: UserService,private iab: InAppBrowser,private formBuilder: FormBuilder )
     { this.value = this.route.snapshot.queryParams['page'];
     console.log(this.value);}
  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      'commentaire': ['', [Validators.maxLength(70), Validators.required]],
      'rate': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'id': ['', [Validators.required]],
      'idp': ['', [Validators.required]],
    });
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
    };
    this.http.get(`${this.user.uri}/userProfile`,httpOptions).subscribe(
      data => {
        this.userDetails = data;
        this.commentForm.get('id').setValue(this.userDetails._id);
        this.commentForm.get('name').setValue(this.userDetails.fullName);
      },
      err => { 
        console.log(err);
        
      }
    );
    this.http.get(`${this.user.uri}/prom/`+`${this.value}`).subscribe(data => {
      let self=this;
      this.test = data;
      this.commentForm.get('idp').setValue(this.test._id);
      console.log(this.test);
      this.test.datef=this.test.datef.toString().replace('T00:00:00.000Z','');
      this._trialEndsAt = this.test.datef;
  
      interval(1000).pipe(map((x) => {
          this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {           
          this._days = this.getDays(this._diff);
          this._hours = this.getHours(this._diff);
          this._minutes = this.getMinutes(this._diff);
          this._seconds = this.getSeconds(this._diff);  
        });
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
    console.log(this.value);
    this.http.get(`${this.user.uri}/getprofit/`+`${this.value}`).subscribe(
      data => {
        this.count = data;
        console.log(this.value);
        console.log(this.count);
      },
      err => { 
        console.log(err);
        
      }
    );
    let mo =this.value;
    console.log(mo);
    this.http.get(`${this.user.uri}/getcomment/`+`${this.value}`).subscribe(
      data => {
        this.cmnt = data;
        console.log(this.cmnt);
      },
      err => { 
        console.log(err);
        
      }
    );
}
getDays(t){
  return Math.floor( t/(1000*60*60*24) );
}

getHours(t){
  return Math.floor( (t/(1000*60*60)) % 24 );
}

getMinutes(t){
  return Math.floor( (t/1000/60) % 60 );
}

getSeconds(t){
  return Math.floor( (t/1000) % 60 );
}
commenter(form: FormGroup) {
  console.log(form.value);
  this.http.post(`${this.user.uri}/comment/`,form.value).subscribe(
    res => {
this.ngOnInit();
    },
    err => {
      console.log("erreur");
    }
  );
}
addprof(proid,userid,lien){
  const obj = {
    proid: proid,
    userid: userid
  };
  console.log(obj)
 const browser = this.iab.create(lien);
  this.http.post(`${this.user.uri}/addprof`,obj).subscribe(res => {
console.log("true")
 }, errorResp=> {
  console.log("false")
 });
 
}

}
