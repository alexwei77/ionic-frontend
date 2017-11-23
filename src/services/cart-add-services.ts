import { Component } from '@angular/core';

import { carts, shops,date,time,currentService,totalItems } from '../services/cart-services'


export class CartAddRemoveService {

    cart = carts;
    shop = shops;
    delDate = date;
    delTime = time;
    service = currentService;
    itemsinCart = totalItems;
    CartAddRemoveService() {

    }
    cartAddRemove(item: any, shop: any) {

        console.log(shop);
        var cartd: CartData = new CartData();
        cartd._id = item._id;
        cartd.name = item.name;
        cartd.itemimage = item.image
        cartd.price = item.price;
        cartd.service = this.service;
        if (shop !== null) {
            cartd.shopname = shop.name;
            cartd.categoryImage=shop.supremeCategory.image;
        }

        cartd.count = item.count;
        let itemChek = this.cart.find(item => item['_id'] === cartd._id);
        if (itemChek != undefined) {
            if (cartd.count === 0) {
                this.cart.splice(this.cart.indexOf(itemChek), 1);
            }
            else {
                itemChek.count = cartd.count;
            }
        }
        else {
            this.cart.push(cartd);
        }
        this.itemsinCart = this.totalItem();
        console.log(this.itemsinCart);
    }

    totalAmount(): any {
        var total: any = 0.00;
        for (var i = 0; i < this.cart.length; i++) {
            total = total + (this.cart[i].count * this.cart[i].price);
        }
        return (total).toFixed(2);
    }

    totalItem():any{
        var total: any = 0.00;
        for (var i = 0; i < this.cart.length; i++) {
            total = total + (this.cart[i].count);
        }
        return (total).toFixed(0);
    }

    setTime(delTime:any)
    {
        this.delTime = delTime;
    }

    setDate(delDate:any)
    {
        this.delDate =  delDate;
    }
}

export class CartData {
    _id: any;
    name: any;
    itemimage:any;
    price: any;
    count: any;
    shopname: any;
    categoryImage:any;
    service:any;
}

