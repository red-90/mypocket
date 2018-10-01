import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { apiLink } from "../../app/apiurls/serverurls.js";
import 'rxjs/add/operator/map';

/*
  Generated class for the CrudProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CrudProvider {

    public token: any;
    public uid: any;

  constructor(public storage: Storage, public http: HttpClient) {
    console.log('Hello CrudProvider Provider');
  }

  getOperations() {
    return new Promise((resolve, reject) => {

        this.storage.forEach( (value, key, index) => {
            if (key == 'token') { this.token = value }
            if (key == 'uid') { this.uid = value }

        }).then((value) => {
            console.log("storage value", this.token, this.uid);
          let headers = new HttpHeaders({"X-Auth-Token": this.token});
          this.http.get(apiLink+'user/'+this.uid+'/operations', {headers: headers})
              .map(res => res)
              .subscribe(data => {
                  resolve(data);
              }, (err) => {
                  reject(err);
              });
      });
    });
  }

  addtOperation(operationData){
    return new Promise((resolve, reject) => {
        this.storage.get('token').then((value) => {
            console.log('crud addop',value);
            let headers = new HttpHeaders({"X-Auth-Token": value});
            this.http.post(apiLink+'operations',  operationData,  {headers: headers})
                .map(res => res)
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        })

    });
  }

}