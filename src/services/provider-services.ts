import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProviderService {
    constructor(private http: Http) { }

    private providerUrl = SERVER_URL + 'api/provider/';

    getProviders(): Observable<any> {
        return this.http.get(this.providerUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getSingleProvider(id: string): Observable<any> {
        return this.http.get(this.providerUrl + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

}