import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Address } from '../pages/address/address.model';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddressService {

    constructor(private http: Http) { }

    private apiURL = SERVER_URL + 'api/appartment';

    private apiAddURL = SERVER_URL + 'api/appartment/request';
    private apiSearchAddURL = SERVER_URL + 'api/appartment/';

    getAddress(): Observable<any[]> {
        return this.http.get(this.apiURL)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    addAddress(address: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        // let jsondata = JSON.stringify(address);
        return this.http.post(this.apiAddURL, JSON.stringify(address),options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    searchAddress(address: any): Observable<any> {
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // let jsondata = JSON.stringify(address);
        return this.http.get(this.apiSearchAddURL+address)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }



}
