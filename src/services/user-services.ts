import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { SERVER_URL } from "./config";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

let userURL = SERVER_URL + 'user';

@Injectable()

export class UserService {

    private apiURL: string = SERVER_URL + 'api';

    constructor(public http: Http) { }

    login(credentials) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json, text/plain, */*');
            this.http.post(userURL + '/login', JSON.stringify(credentials), { headers: headers })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    register(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            // headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json, text/plain, */*');
            // var body = "";
            // for (var key in data) {
            //     body = body + key + "=" + encodeURIComponent(data[key]) + "&";
            // }
            this.http.post(userURL + '/register', JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    socialuserLogin(data){
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json, text/plain, */*');

            this.http.post(userURL + '/social/login', JSON.stringify(data), { headers: headers })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });

    }

    resetPassword(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json, text/plain, */*');

            this.http.post(userURL + '/forgotpassword', JSON.stringify(data) , { headers: headers })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    uploadProfileImage(data) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json, text/plain, */*');

            this.http.post(this.apiURL + '/profile/upload', JSON.stringify(data) , { headers: headers })
                .subscribe(res => {
                    console.log('res');
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    console.log('err');
                    console.log(err);
                    reject(err);
                });
        });
    }

    resetEmail(data){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json, text/plain, */*');

        this.http.post(userURL + '/resetemail', JSON.stringify(data) , { headers: headers })
            .subscribe(res => {
                console.log('res');
                console.log(res);
                resolve(res);
            }, (err) => {
                console.log('err');
                console.log(err);
                reject(err);
            });
    });
    }

    changePassword(data){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json, text/plain, */*');

        this.http.post(userURL + '/changepassword', JSON.stringify(data) , { headers: headers })
            .subscribe(res => {
                console.log('res');
                console.log(res);
                resolve(res);
            }, (err) => {
                console.log('err');
                console.log(err);
                reject(err);
            });
    });
    }

    uploadPhoto(data){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json, text/plain, */*');

        this.http.post(SERVER_URL + '/image/upload/basestring', JSON.stringify(data) , { headers: headers })
            .subscribe(res => {
                console.log('res');
                console.log(res);
                resolve(res);
            }, (err) => {
                console.log('err');
                console.log(err);
                reject(err);
            });
    });
    }

}
