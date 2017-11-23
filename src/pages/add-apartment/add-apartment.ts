import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { PaymentSavedCardsPage } from '../payment-saved-cards/payment-saved-cards';
import { OrderItemsPage } from '../order-items/order-items';
import { submitformPage } from './../submitform/submitform';
import { LoginPage } from './../login/login';
import { PaymentCreditCardPage } from '../payment-credit-card/payment-credit-card';
import { AddressService } from './../../services/address-services';
@Component({
  selector: 'page-add-apartment',
  templateUrl: 'add-apartment.html'
})
export class AddApartmentPage {

  activephone: boolean = false;
  activeemail: boolean = false;
  addAddressData = { propertyName: '', personName: '', phone: '', email: '' };
  loading: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public navParams: NavParams, public modalCtrl: ModalController, public AddressService: AddressService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddApartmentPage');
  }

  goToCheckOut() {
    this.navCtrl.push(OrderItemsPage);
  }

  gotoPayment() {
    this.navCtrl.push(PaymentSavedCardsPage);
  }

  submitForm() {
    // add your check auth here
    //this.navCtrl.setRoot(HomePage);
    // addAddressData = { properyName: '', personName: '',phone: '', email: '' };
    if (this.addAddressData.propertyName == '') {
      this.presentToast('Please Input Property Name');
      return;
    }
    if (this.addAddressData.personName == '') {
      this.presentToast('Please Input Person Name');
      return;
    }
    if (this.addAddressData.phone == '') {
      this.presentToast('Please Input Phone');
      return;
    }

    if (this.addAddressData.email == '') {
      this.presentToast('Please Input Email');
      return;
    }
    // if (!this.EMAIL_REGEXP.test(this.addAddressData.email)) {
    //   this.presentToast('Email is Invalid');
    //   return;
    // }
    this.showLoader();
    let data =
      {
        "propertyName": this.addAddressData.propertyName,
        "personName": this.addAddressData.personName,
        "phone": this.addAddressData.phone,
        "email": this.addAddressData.email
      }
    this.AddressService.addAddress(data).subscribe((result) => {
      this.loading.dismiss();
      const profileModal = this.modalCtrl.create(submitformPage);
      profileModal.present();
      this.navCtrl.push(LoginPage);

    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err.message);
    });


    //this.navCtrl.push(PaymentCreditCardPage);
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
  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();
  }

}
