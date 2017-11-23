import { CreditcardService } from './../../services/creditcard-services';
import { LoadingService } from './../../services/loading-service';
import { AddCardPagePage } from './../add-card/add-card';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-card-settings',
  templateUrl: 'card-settings.html'
})
export class CardSettingsPage {
  cards: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
    public loadingService: LoadingService,public creditcardService:CreditcardService,private toastCtrl: ToastController) {
      this.getCards();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardSettingsPagePage');
  }

  addCard() {
    // this.navCtrl.push(AddCardPagePage)
    let profileModal = this.modalCtrl.create(AddCardPagePage);
    profileModal.onDidDismiss(data => {
      this.getCards();
    });
    profileModal.present();
  }

  getCards(){
    let user_data = localStorage.getItem("userData");
    let user_data_json = JSON.parse(user_data);
    this.creditcardService.getSavedCardsbyUserID(user_data_json._id).subscribe(
      data => {
        this.cards = data.data.data;
        // this.items = data;
        //this.loadingService.loading.dismiss();
        console.log(data);
        // Create order for logged-in user
      },
      err => {
        //this.loadingService.loading.dismiss();
        this.presentToast("Please enter the valid card information");
      }
    );
  }

  deleteCard(card){
    let user_data_json = JSON.parse(localStorage.getItem("userData"));
    this.creditcardService.deleteCard(card.id, { 'userId' : user_data_json._id }).subscribe(
      data => {
        console.log(data);
        this.presentToast("Card Deleted Successfully");
        this.getCards();
      },
      err => {
        //this.loadingService.loading.dismiss();
        this.presentToast("Please enter the valid card information");
      });

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
}
