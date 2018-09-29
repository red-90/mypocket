import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { CrudProvider } from '../../providers/crud/crud';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public operations; any;
  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public crudProvider:CrudProvider) {
      this.crudProvider.getOperations().then((data) => {
          this.operations = data;
          console.log(data);
      })
  }

}
