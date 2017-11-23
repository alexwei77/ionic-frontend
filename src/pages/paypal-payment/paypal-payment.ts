import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { PaypalConfig } from '../paypal-config/paypal-config';
import { CartAddRemoveService } from '../../services/cart-add-services'

@Component({
    templateUrl: 'paypal-payment.html'
})

export class PayPalPage {
    payment: PayPalPayment = new PayPalPayment("0", 'USD', '', '');
    payPalEnvironment: string = 'payPalEnvironmentSandbox';
    constructor(private payPal: PayPal, private cartService: CartAddRemoveService) {
    }

    makePayment() {
        this.payment = new PayPalPayment(String(this.cartService.totalAmount()), "USD", 'Groceries Payment', 'Groceries Payment');
        //    let  payment = new PayPalPayment( "20","USD",'asx','asdzxc');
        //    payment.amount = "20";
        this.payPal.init({
            PayPalEnvironmentProduction: PaypalConfig.payPalEnvironmentProduction,
            PayPalEnvironmentSandbox: PaypalConfig.payPalEnvironmentSandbox
        }).then(() => {
            this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
                this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
                    alert(`Successfully paid. Status = ${response.response.state}`);
                    alert(JSON.stringify(response));
                    console.log(response);
                }, (ren) => {
                    alert(JSON.stringify(ren));
                    console.error('Error or render dialog closed without being successful');
                });
            }, (con) => {
                alert(JSON.stringify(con));
                console.error('Error in configuration');
            });
        }, (error) => {
            alert(JSON.stringify(error));
            console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
        });
    }
}