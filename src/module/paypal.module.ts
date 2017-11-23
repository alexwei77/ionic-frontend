import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PayPalPage } from '../pages/paypal-payment/paypal-payment';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@NgModule({
	imports: [IonicModule],
	declarations: [
		PayPalPage
	],
	entryComponents: [
		PayPalPage
    ],
    providers: [
       PayPal 
    ]
})
export class PayPalModule {

}