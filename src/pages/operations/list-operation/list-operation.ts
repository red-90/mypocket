import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CrudProvider} from "../../../providers/crud/crud";

/**
 * Generated class for the ListOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-operation',
  templateUrl: 'list-operation.html',
})
export class ListOperationPage {

    public operations; any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public crudProvider:CrudProvider) {

      this.crudProvider.getOperations().then((data) => {
          this.operations = data;
          console.log(data);
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListOperationPage');
  }

    GotoPage(page) {
        console.log(page);
        this.navCtrl.setRoot(page);
    }
}
