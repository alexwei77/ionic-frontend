import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Events } from 'ionic-angular';

// import { CalendarController } from 'ion2-calendar/dist';
import { IMyDpOptions } from 'mydatepicker';
import { DatePipe } from '@angular/common';
// import { OrderItemsPage } from '../order-items/order-items';
// import { CartPage } from '../cart/cart';
import { AddressPage } from '../address/address';
import { ApartmentsPage } from '../apartments/apartments';
import { AddApartmentPage } from "../add-apartment/add-apartment";
import { CartPetPage } from "../cart-pet/cart-pet";

import { PetService } from '../../services/pet-services';
import { LoadingService } from '../../services/loading-service';
import { CartHouseCleaningPage } from '../cart-house-cleaning/cart-house-cleaning';
import { CartDataProvider } from '../../providers/cart-data';
import { CartPage } from '../cart/cart';


@Component({
    selector: 'page-date-house',
    templateUrl: 'date-house.html'
})
export class DateHousePage {

    @ViewChild('navBar') navBar: Navbar;

    service_id: any;
    date: any = new Date();

    times = [
        "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"
    ];

    time = [false, false, true, false, false, false, false, false, false, false, false, false];

    housedata = { 'bedroom': "", "bathroom": "", "date": "" }
    petdata = { 'petdata': "", 'date': "" }

    startDate = new Date();
    cartHouseList: any = [];
    cartPetList: any = [];

    public calendarOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
        showTodayBtn: false,
        inline: true,
        selectorWidth: '100%',
        selectorHeight: '255px',
        sunHighlight: false,
        firstDayOfWeek: 'su',
        disableSince: { year: 0, month: 0, day: 0 },
        disableUntil: { year: 9999, month: 12, day: 31 },
        enableDays: []
    };

    // Initialized to specific date (09.10.2018).
    // public selDate: any = { date: { year: 2018, month: 10, day: 9 } };
    public selDate: any = null;
    price: any;


    // constructor(public navCtrl: NavController, public navParams: NavParams, public calendarCtrl: CalendarController) { }
    constructor(public navCtrl: NavController,
        private petService: PetService,
        public loadingService: LoadingService,
        public navParams: NavParams,
        public cartCrud: CartDataProvider,
        public events:Events
    ) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DateTimePage');
        console.log(this.navParams);
        this.getLocalCart();
        this.setEnableDays();
    }

    ngOnInit(): void {
        this.navBar.setBackButtonText('');
    }

    setEnableDays() {
        let copy_option = this.getCopyOfOptions();
        this.loadingService.showLoader();
        this.service_id = localStorage.getItem("Service-id");
        this.petService.getServiceCalendar(this.service_id).subscribe(
            data => {
              console.log(data.data);
                let service_calendars = data.data;
                for (let c of service_calendars) {
                    let d = new Date(c.date);
                    // if (d.getDay() == 1 || d.getDay() == 3 || d.getDay() == 4) {
                    //     copy_option.enableDays.push({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() });
                    // }
                    if(c.status == true){
                      copy_option.enableDays.push({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() });
                    }
                }
                this.calendarOptions = copy_option;
                this.loadingService.loading.dismiss();
            },
            err => {
                console.log(err);
                this.loadingService.loading.dismiss();
            }
        );
    }

    getCopyOfOptions(): IMyDpOptions {
        return JSON.parse(JSON.stringify(this.calendarOptions));
    }

    onDateChanged($event) {
        console.log('onDateChanged');
        console.log($event);
        this.date = $event.date;
        console.log(this.cartHouseList[this.navParams.data.index]);

        // this.housedata.date = this.date;
        // this.petdata.date = this.date;
        if (this.navParams.data.service.petdata==null){
            this.cartHouseList[this.navParams.data.index].date = $event.date;
            this.cartHouseList[this.navParams.data.index].jsDate = $event.jsdate;
            this.cartCrud.saveCart('house', this.cartHouseList).then(res=>{
                this.events.publish('reloadDetails');
                this.navCtrl.pop   ();
            })
        } else{

            this.cartPetList[this.navParams.data.index].petdata[this.navParams.data.i].date = $event.date;
            this.cartPetList[this.navParams.data.index].petdata[this.navParams.data.i].jsDate = $event.jsdate;
            this.cartCrud.saveCart('pet', this.cartPetList).then(res=>{
                this.events.publish('reloadDetails');
                this.navCtrl.pop();
            })
        }
    }

    onClickTime(num) {
        this.time.map((item, i) => {
            this.time[i] = false;
        })
        this.time[num] = true;
    }

    // gotoOrderItems() {
    //   this.navCtrl.push(OrderItemsPage);
    // }

    // gotoOrderSummany() {
    //   this.navCtrl.push(CartPage, { state: 'modify' })
    // }

    // goToAddress() {
    //     this.navCtrl.push(AddressPage);
    // }

    getLocalCart() {
        this.cartCrud.getCartData('pet').then((localCart) => {
            if (localCart) {
                this.cartPetList = JSON.parse(localCart);
            }
            else this.cartPetList = [];
        })
        this.cartCrud.getCartData('house').then((localCart) => {
            if (localCart) {
                this.cartHouseList = JSON.parse(localCart);
            }
            else this.cartHouseList = [];
        })
    }

    gotoOrderSummany() {
        if (this.navParams.data.flag == "pet") {
            console.log(this.petdata);
            this.cartPetList.push(this.petdata); this.cartCrud.saveCart('pet', JSON.stringify(this.cartPetList)).then(res => {
                this.navCtrl.push(CartPage, {
                    state: 'modify'
                });
            });
        } else {
            this.cartHouseList.push(this.housedata)
            this.cartCrud.saveCart('house', JSON.stringify(this.cartHouseList)).then(res => {
                console.log('res:' + res);
                this.navCtrl.push(CartPage, { state: 'modify' });
            });
        }

    }
}
