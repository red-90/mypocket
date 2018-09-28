import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { apiLink } from "../../app/apiurls/serverurls.js";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public storage: Storage , public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

    createAccount(user){
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            let body = new HttpParams();
            body = body.set('fullname', user.fullname);
            body = body.set('email', user.email);
            body = body.set('plainPassword', user.password);
            console.log("body",body);
            this.http.post(apiLink+'users', body, {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    login(credentials){
        return new Promise((resolve, reject) => {
            let headers = new HttpHeaders();
            headers.append('Access-Control-Allow-Origin' , '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
            headers.append('Accept','application/json');
            headers.append('Content-Type','application/json');
            let body = new HttpParams();
            body = body.set('login', credentials.login);
            body = body.set('password', credentials.password);
            console.log(credentials);
            console.log(JSON.stringify(credentials));
            this.http.post(apiLink+'auth-tokens', body, {headers: headers})
                .subscribe(res => {
                    this.token = res['value'];
                    this.storage.set('token', res['value']);
                    resolve(res);
                }, (err) => {
                    console.log("Provider error", err)
                    reject(err);

                });  });

    }

    checkAuthentication(){
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((value) => {
                this.token = value;
                resolve(this.token)
            })
        });
    }

    logout(){
        this.storage.set('token', '');
    }

    /*getOperations() {
        let headers = new HttpHeaders();
        //headers.append('Access-Control-Allow-Origin' , '*');
        /*headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept','application/json');
        headers.append('content-type','application/json');
        headers.append("X-Auth-Token", "g/HaMirzO9uLgo87pWCm8LZFqG/s3vY1QJlj3tl7X6+Bwwy0sdxCPQqjtmoWBped/ho=");
        return new Promise(resolve => {
            this.http.get(apiKey+'operations', {headers: headers}).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
            });
        });
    }*/

}
