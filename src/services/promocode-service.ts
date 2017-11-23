import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromocodeService {
    constructor(private http: Http) { }
    private Url = SERVER_URL + 'api/promocode/';

    getPromocode(promocode): Observable<any> {
        return this.http.get(this.Url + promocode)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}