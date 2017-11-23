import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class CartDataProvider {

  constructor(public storage: Storage) {

  }

  getCartData(flag) {
    return this.storage.get(flag+'carts');
  }

  getTotal(){
    return this.storage.get('cartTotal');
  }
  getAllCartData() {
    return Promise.all([
      this.storage.get('petcarts'),
      this.storage.get('housecarts'),
    ]).then(([petCart, houseCart]) => {
      return [petCart, houseCart];
    })
  }

  saveCart(flag,data) {
    console.log(data);
    let newCartData = JSON.stringify(data);
    console.log(newCartData);
    return new Promise((resolve, reject)=>{
      this.storage.set(flag+'carts', newCartData).then(res=>{
        resolve(res);
      }).catch(err=>{reject(err)});
    })
  }

  saveCartTotal(data){
    return new Promise((resolve, reject)=>{
      this.storage.set('cartTotal', data).then(res=>{
        resolve(res);
      }).catch(err=>{reject(err)});
    })
  }

  format(){
    this.storage.remove('petcarts');
    this.storage.remove('housecarts');
  }

}
