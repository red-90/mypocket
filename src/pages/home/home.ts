import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import { CrudProvider } from '../../providers/crud/crud';
import { ListOperationPage } from "../operations/list-operation/list-operation";
import {LoginPage} from "../login/login";

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


  GotoPage(page) {
      console.log(page);
        this.navCtrl.setRoot(page);
  }
}
