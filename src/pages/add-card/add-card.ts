import { CreditcardService } from './../../services/creditcard-services';
import { LoadingService } from './../../services/loading-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

/*
  Generated class for the AddCardPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-card',
  templateUrl: 'add-card.html'
})
export class AddCardPagePage {
  card_num1: string = "";
	card_num2: string = "";
	card_num3: string = "";
	card_num4: string = "";
	card: any = {
		"number": "",
		"name": "",
		"exp_month": "01",
		"exp_year": "" ,
		"cvc": "" ,
		"userId": ""
	}
	user_id: string = "";
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,	public loadingService: LoadingService,public creditcardService:CreditcardService,private toastCtrl: ToastController,) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCardPagePage');
  }

  saveCard(){
    this.card.number = this.card_num1.toString() + this.card_num2.toString() + this.card_num3.toString() + this.card_num4.toString();

        // check if the user logged in
        let user_data = localStorage.getItem("userData");
        if (user_data) {
          let user_data_json = JSON.parse(user_data);
          if (user_data_json._id) {
            this.user_id = user_data_json._id;
            this.card.userId = user_data_json._id;
            this.card.cvc = parseInt(this.card.cvc);
            this.card.exp_month = parseInt(this.card.exp_month);
            this.card.number = parseInt(this.card.number);
            // add credit card
            this.loadingService.showLoader();
            this.creditcardService.addCard(this.card).subscribe(
              data => {
                // this.items = data;
                this.loadingService.loading.dismiss();
                console.log(data);
                this.presentToast('Card Added Successfully');
                // Create order for logged-in user
                this.card = {
                  "number": "",
                  "name": "",
                  "exp_month": "01",
                  "exp_year": "" ,
                  "cvc": "" ,
                  "userId": ""
                }
                this.viewCtrl.dismiss();
              },
              err => {
                this.loadingService.loading.dismiss();
                this.presentToast("Please enter the valid card information");
              }
            );
          } else {

          }
        } else {

        }
  }

  presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			dismissOnPageChange: false
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

}
