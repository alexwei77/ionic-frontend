import {TodoListPagePage} from '../pages/todo-list/todo-list';
import {RewardsPage} from '../pages/rewards/rewards';
import {VipPage} from '../pages/vip/vip';

import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, Events } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//for the side menu
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { NotificationPage } from '../pages/notification/notification';
import { SettingsPage } from "../pages/settings/settings";

import { Geolocation } from '@ionic-native/geolocation';
import { CartPage } from '../pages/cart/cart';
import { DoListPage } from '../pages/do-list/do-list';


// Keep all this imports here and use them for testing
// import { DateTimePage } from '../pages/date-time/date-time';
// import { DateHousePage } from '../pages/date-house/date-house';
// import { AddressPage } from '../pages/address/address';
// import { OrderConfirmationPage } from '../pages/order-confirmation/order-confirmation';
// import { HouseCleaningPage } from '../pages/house-cleaning/house-cleaning';
// import { ProvidersManualPage } from '../pages/providers-manual/providers-manual';
// import { ProvidersRecommendedPage } from '../pages/providers-recommended/providers-recommended';
import {InvoicePage} from '../pages/invoice/invoice';
import { BundledealsPage } from '../pages/bundledeals/bundledeals';
import { ReceiptPage } from '../pages/receipt/receipt';

// import { LearnMoreManualPage } from '../pages/learn-more-manual/learn-more-manual';
// import { ApartmentsPage } from '../pages/apartments/apartments';
// import { PetServicesPage } from '../pages/pet-services/pet-services';
// import { SelectPetPage } from '../pages/select-pet/select-pet';
// import { AddPetPage } from '../pages/add-pet/add-pet';
// import { OrderSummaryPage } from '../pages/order-summary/order-summary';
// import { PaymentSavedCardsPage } from '../pages/payment-saved-cards/payment-saved-cards';
// import { FinalPage } from "../pages/final/final";
// import { ForgotEmailPage } from "../pages/forgot-email/forgot-email"
// import { MatchPage } from "../pages/match/match";
// import { CartPage } from "../pages/cart/cart";
// import { CartPetPage } from "../pages/cart-pet/cart-pet";



@Component({
  templateUrl: 'app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp implements OnInit {
  public rootPage: any;
  public nav: any;
  public imagePath:any;
  public pages = [
    {
      title: 'My orders',
      icon: 'ios-cart-outline',
      imagePath:"",
      component: MyOrdersPage
    },
    {
      title: 'Notifications',
      icon: 'ios-notifications-outline',
      imagePath:"",
      component: NotificationPage
    },
    {
      title: 'Rewards',
      icon: "",
      imagePath:"../assets/icon/Common/menu-reward.png",
      component: RewardsPage
    },
    {
      title: 'VIP',
      icon: "",
      imagePath:"../assets/icon/Common/menu-diamond.png",
      component: VipPage
    },
    {
      title: 'Settings',
      icon: 'ios-settings-outline',
      component: SettingsPage
    }

  ];


  private user_image: string = "assets/icon/Common/profile-blank.jpg";
  private user_display_name: string = "";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, private geolocation: Geolocation, public events: Events) {
    this.getLocation();
    this.rootPage = HomePage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
  ngOnInit() {
    this.events.subscribe("userloggedin", (user) => {
      console.log('userloggedin');
      console.log(user);
      this.setMenuData(user);
    });
  }
  ionViewWillEnter() {

  }

  setMenuData(user) {
    if (user.image) {
      this.user_image = user.image;
    } else {
      this.user_image = "assets/icon/Common/profile-blank.jpg";
    }

    if (user.firstName || user.lastName) {
      this.user_display_name = user.firstName + " " + user.lastName;
    } else {
      this.user_display_name = "@" + user.username;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      localStorage.setItem("latlng", resp.coords.latitude + ',' + resp.coords.longitude);
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);

    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Enable Your Location',
        subTitle: 'We need your current location so please enable your location!',
        buttons: ['OK']
      });
      alert.present();
      console.log('Error getting location', error);
    });
  }

  logout() {
    localStorage.removeItem('userData');
    this.nav.setRoot(LoginPage);
  }
}
