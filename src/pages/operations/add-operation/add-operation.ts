import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { CrudProvider } from '../../../providers/crud/crud';
import { ListOperationPage } from '../list-operation/list-operation';
import {Storage} from "@ionic/storage";

/**
 * Generated class for the AddOperationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-operation',
  templateUrl: 'add-operation.html',
})
export class AddOperationPage {

  operationData = {
      name: "",
      type: "",
      price: "",
      description: "",
      operation_date: "",
      created: new Date().toISOString(),
      user: ""
  }
    public uid: any;

  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public crudProvider: CrudProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOperationPage');
  }

  AddOperation(){

      this.storage.forEach( (value, key, index) => {
          if (key == 'uid') { this.operationData.user = value }

      }).then((value) => {
          this.crudProvider.addtOperation(this.operationData).then((result)=>{
              console.log(result)
              this.navCtrl.push('ListOperationPage');
          },(err)=>{
              console.log("insert err: "+ err)
              console.log("this.operationData: "+ JSON.stringify(this.operationData))
          })
      });

  }
}
