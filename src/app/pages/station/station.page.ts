import { Component,  OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-station',
  templateUrl: './station.page.html',
  styleUrls: ['./station.page.scss'],
})
export class StationPage implements OnInit {
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
  onStationForm: FormGroup;
  cmnt: Object;
  constructor(    private user: UserService,private router: Router,
    private route: ActivatedRoute,public http: HttpClient,private formBuilder: FormBuilder,private location:Location )
     {
       this.value  = this.router.getCurrentNavigation().extras.state
       console.log(this.value);
      }
  ngOnInit() {
    this.onStationForm = this.formBuilder.group({
      'Numero': ['', [Validators.required]],
      'Type': ['', [Validators.required]],
      'Nom': ['', [Validators.required]],
      'Transmission': ['', [Validators.required]],
      'Capacite': ['', [Validators.required]],
      'Bande': ['', [Validators.required]],
      'Configuration': ['', [Validators.required]],
      'Acceptance': ['', [Validators.required]],
    });    ;  
    this.onStationForm.setValue({
      Numero: this.value.Numero,
      Type: this.value.Type,
      Nom: this.value.Nom,
      Transmission: this.value.Transmission,
      Capacite: this.value.Capacite,
      Bande: this.value.Bande,
      Configuration: this.value.Configuration,
      Acceptance: this.value.Acceptance
    })
    console.log(this.value.Numero) 
  }
  inscrit(form:any){
    form.value._id=this.value._id
    form.value.Lng=this.value.Lng
    form.value.Lat=this.value.Lat
    this.http.put(`${this.user.uri}/updatestation/${this.value._id}`,form.value).subscribe(
      res => {alert("Modification de station avec succes"); this.onStationForm.reset();this.onStationForm.markAsUntouched},
    err => {alert("echec de modification de station avec succes")})
    }
  } 
