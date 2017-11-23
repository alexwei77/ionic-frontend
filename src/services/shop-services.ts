import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class ShopService {
    constructor(public http: Http){}

    getShopName(zipcode){
        return this.http.get(SERVER_URL + 'api/retailer/' + zipcode)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getCategories(shopid){
        console.log('getCategories');
        return this.http.get(SERVER_URL + 'api/grocerycategory/' + shopid)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getSubCategories(catid){
        console.log('getSubCategories');
        return this.http.get(SERVER_URL + 'api/grocerysubcategory/' + catid)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getItems(subcatid){
        console.log('getItems');
        return this.http.get(SERVER_URL + 'api/grocery/subcategoryitem/' + subcatid)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}