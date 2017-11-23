import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Address } from '../pages/address/address.model';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrderService {

    private url: string = SERVER_URL + 'api/order';
    private orderUrl: string = SERVER_URL + 'api/service/order';

    constructor(private http: Http) { }

    getMatches(orderID: string) {
        // return new Promise((resolve, reject) => {
        //     this.http.get(this.url + "/match/" + orderID)
        //     .subscribe((res: Response) => {
        //         resolve(res.json());
        //     }, (err: any) => {
        //         reject(err);
        //     });
        // });

        return this.http.get(this.url + "/match/" + orderID)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    createOrder(reqData:any) {
        return this.http.post(this.orderUrl, reqData)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getMyOrders(userId:string){
      return this.http.get(this.orderUrl + "/" + userId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

}
