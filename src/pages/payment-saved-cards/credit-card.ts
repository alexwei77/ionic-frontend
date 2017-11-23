import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, App, ToastController } from 'ionic-angular';

import { OrderConfirmationPage } from '../order-confirmation/order-confirmation';
import { LoginPage } from '../login/login';

import { CartAddRemoveService } from '../../services/cart-add-services'
import { OrderService } from '../../services/order-services';
import { CreditcardService } from '../../services/creditcard-services';
import { LoadingService } from '../../services/loading-service';

import { CartDataProvider } from '../../providers/cart-data';

import { FinalPage  } from "./../final/final";

@Component({
	selector: 'credit-card',
	templateUrl: 'credit-card.html'
})
export class CreditCardPage {

	items: any;
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
	totalAmount : any = [];
	constructor(public creditcardService:CreditcardService,
		public navCtrl: NavController,
		private toastCtrl: ToastController,
		public navParams: NavParams,
		public orderService:OrderService,
		public cartServices:CartAddRemoveService,
		public loadingService: LoadingService,
		public cartData:CartDataProvider,
		private app: App
	) {
		this.totalAmount = cartServices.totalAmount();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PaymentCreditCardPage');
	}

	ngOnInit(): void {

	}
	private pay() {
		this.card.number = this.card_num1.toString() + this.card_num2.toString() + this.card_num3.toString() + this.card_num4.toString();

		// check if the user logged in
    let user_data = localStorage.getItem("userData");
		if (user_data) {
			let user_data_json = JSON.parse(user_data);
			if (user_data_json._id) {
				this.user_id = user_data_json._id;
				this.card.userId = user_data_json._id;
				this.card.name = user_data_json.username;
				// add credit card
				this.loadingService.showLoader();
				this.creditcardService.addCard(this.card).subscribe(
					data => {
						// this.items = data;
						this.loadingService.loading.dismiss();

						// Create order for logged-in user
						this.createOrder(1);
					},
					err => {
						this.loadingService.loading.dismiss();
						this.presentToast("Please enter the valid card information");
					}
				);
			} else {
				this.createOrder(0);
			}
		} else {
			this.createOrder(0);
		}
	}

	/**
	 * Create order
	 * Params: user_type: 1 => logged-in user, 0 => guest
	**/
	createOrder(user_type: number) {
		// let req_data: any = (user_type == 1) ? this.createOrderParamsForLoggedUser() : this.createOrderParamsForGuest();
		this._createOrderParams(user_type).then(params => {
			this.loadingService.showLoader();
			console.log(params);
			this.orderService.createOrder(params).subscribe(
				data => {
					this.loadingService.loading.dismiss();
					if (user_type == 1) {
						this.gotoOrderConfirmation();
					} else {
						this.goToLogin();
					}
				}, err => {
					this.loadingService.loading.dismiss();
					this.presentToast(err);
				}
			);
		});

	}

	private _createOrderParams(user_type: number): any {
    let that = this;
    let keyDetails = JSON.parse(localStorage.getItem('keyArrangement'));
		return new Promise(function(resolve, reject) {
			let params: any = {};
			if (user_type == 1) {
				params.userId = that.user_id;
			} else {
				params.email = "vinit.webmigrates@gmail.com";
				params.number = that.card.number;
				params.name = "vinit devani";
				params.exp_month = parseInt(that.card.exp_month);
				params.exp_year = parseInt(that.card.exp_year);
				params.cvc = that.card.cvc;
			}

			// Get address Id
			params.addressId = "";

			let address_data:any = localStorage.getItem('selectedAddress');
			if (address_data) {
				let address_data_json = JSON.parse(address_data);
				params.addressId = address_data_json._id;
			}

			params.customerNote = "Quick delivery";
			params.fulfillDate = "10/14/2017 05:30 PM";
			params.orderDetail = [];
			params.orderDetail[0] = {};
			params.orderDetail[0].houseCleaning = [];
			params.orderDetail[0].petService = [];
			params.orderDetail[0].groceryItem = [];
      params.keyArrangments = keyDetails.keyArrangments;
      params.contactBy = keyDetails.contactBy;
      params.contact = keyDetails.contact;
			// get Cart Data

			that.cartData.getAllCartData().then(([petCart, houseCart]) => {
				console.log('petCart');
				console.log(petCart);
				console.log('houseCart');
				console.log(houseCart);
				if (petCart) {
					let pet_cart = JSON.parse(petCart);
					if (pet_cart && pet_cart.length > 0) {
						for(let pc of pet_cart) {
							params.orderDetail[0].petService.push({
								"pet": {
									"petid": pc.petdata[0].pet.type,
									"from": 8,
									"to": 9,
									"price": parseInt(pc.petdata[0].service.price),
									"discount": 0
								}
							})
						}
					}
				}

				if (houseCart) {
					let house_cart = JSON.parse(houseCart);
				}
				resolve(params);
			});
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

	gotoOrderConfirmation() {
		this.app.getRootNav().setRoot(FinalPage);
	}

	goToLogin() {
		localStorage.setItem("cardData", JSON.stringify(this.card));
		this.app.getRootNav().push(FinalPage);
	}
}
