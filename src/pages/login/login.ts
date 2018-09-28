import { Component } from '@angular/core';
import { IonicPage,  NavController, AlertController, NavParams } from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';

import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    operations: any;
    email: string = '';
    password: string = '';
    errorMsg: string;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

    errorFunc(message) {
        let alert = this.alertCtrl.create({
            title: 'Warining!',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    myLogIn() {
        if (this.email.trim() !== '') {
            console.log(this.email.trim() + "   " + this.password.trim())
            if (this.password.trim() === '') {
                this.errorFunc('Please put your password')
            } else {
                let credentials = {
                    login: this.email,
                    password: this.password
                };
                this.authProvider.login(credentials).then((result) => {
                    console.log("Home result", result);
                    this.navCtrl.setRoot(HomePage);
                }, (err) => {
                    console.log("home erroe",err);
                    this.errorFunc('Wrong credentials ! try again')
                    console.log("credentials: " + JSON.stringify(credentials))

                });
            }
        }
        else {
            this.errorFunc('Please put a vaild password !  for ex:(123456)')
        }
    }

    Register(){
        this.navCtrl.setRoot(RegisterPage);
    }

}
