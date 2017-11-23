import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-final',
  templateUrl: 'final.html'
})
export class FinalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
  userData : any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalPagePage');
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  login(): void {
    this.navCtrl.push(LoginPage);
  }

  signup(): void{
    this.navCtrl.push(RegisterPage);
  }

}
