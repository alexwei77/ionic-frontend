import { Component,OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { MatchPage } from '../match/match';
import { RegisterPage } from '../register/register';
import { ForgotEmailPage } from "../forgot-email/forgot-email";

import { UserService } from '../../services/user-services';
import { OrderSummaryPage } from '../order-summary/order-summary';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  facebookConnectPlugin: any;
  loading: any;
  loginData = { email: '', password: '' };
  data: any;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private fb: Facebook,
    private googlePlus: GooglePlus
  ) {
      this.navCtrl = navCtrl;
  }

  ngOnInit(): void {
    let GetLatLng = localStorage.getItem("latlng");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    // this.navCtrl.setRoot(RegisterPage);
    this.navCtrl.push(RegisterPage);
  }

  //I added this so you can just tap login button and proceed without hassle
  // its good for testing
  dummyLogin() {
    this.navCtrl.setRoot(OrderSummaryPage);
  }

  login() {
    if (this.loginData.email == '') {
      this.presentToast('Please Input Email');
      return;
    }
    if (!this.EMAIL_REGEXP.test(this.loginData.email)) {
      this.presentToast('Email is Invalid');
      return;
    }
    if (this.loginData.password == '') {
      this.presentToast('Please Input Password');
      return;
    }

    this.showLoader();
    this.userService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      this.data = JSON.parse(this.data._body);
      if (this.data.message == "Login successful") {
        localStorage.setItem("userData", JSON.stringify(this.data.data));
        this.gotoHomePage();

      } else {
        this.presentToast(this.data.message);
      }
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  doFbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email']).then((res: FacebookLoginResponse) => {
      this.fb.api("/me?fields=email,name,picture,first_name,last_name,gender,link,timezone&access_token=" + res.authResponse.accessToken, ['public_profile', 'user_friends', 'email']).then(result => {

            let getRes = {
                  "auth_provider": "facebook",
                  "email": result.email,
                  "firstName" :result.first_name,
                  "lastName" : result.last_name,
                  "image": result.picture.data.url,
                  "token" : res.authResponse.accessToken
            }
            this.socialLogin(getRes);
      })
    }).catch(e => {
      console.log('Error logging into Facebook', e)
    });
  }
  doGoogleLogin() {
    this.googlePlus.login({}).then(result => {
      let getRes = {
          "auth_provider": "google",
          "email": result.email,
          "firstName" :result.givenName,
          "lastName" : result.familyName,
          "image": result.imageUrl,
          "token" : ""
      }
      this.socialLogin(getRes);
    }).catch(err => {
      console.error(err);
    });
  }
  socialLogin(userInfo) {
    this.showLoader()
    this.userService.socialuserLogin(userInfo).then((result) => {
      console.log(JSON.stringify(result));
      try {
        this.data = result;
        this.data = JSON.parse(this.data._body);
        if (this.data.message == "Login successful") {
          localStorage.setItem("userData", JSON.stringify(this.data.data));
          this.loading.dismiss();
          this.gotoHomePage();
        } else {
          this.presentToast(this.data.message);
        }
      } catch(error) {
        console.log(error);
        this.loading.dismiss();
        this.presentToast('Please Try Again');
      }
    })
  }

  forgotEmail(): void {
    this.navCtrl.push(ForgotEmailPage);
  }

  gotoHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  gotoMatchPage() {
   this.navCtrl.setRoot(MatchPage); 
  }
}
