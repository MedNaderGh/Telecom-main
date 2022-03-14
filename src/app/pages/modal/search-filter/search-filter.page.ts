import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/pages/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  public radiusmiles = 1;
  public minmaxprice = {
    upper: 500,
    lower: 10
  };
  categorie: any;
  partenaire: Object;

  constructor(private modalCtrl: ModalController,private user: UserService,public http: HttpClient,private router:Router) { }

  ngOnInit() {
    this.http.get(`${this.user.uri}/getcat`).subscribe(data => {
      this.categorie = data;
      console.log(this.categorie);
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });
    this.http.get(`${this.user.uri}/getpart`).subscribe(data => {
      this.partenaire = data;
      console.log(this.partenaire);
    }, err => {
      if(err.status === 401) {
        console.log("erreur");
      }
    });  
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
search(m,r,c,p,s){
  console.log(m,r,c,p,s);
  this.router.navigate(['/recherche'], { queryParams: { mot: m ,distance: r,categorie: c,partenaire: p,reduction: s}});
  this.modalCtrl.dismiss();
}
}
