import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

    private rootPage;
    private homePage;
    private loginPage;
    private registerPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
      this.homePage = HomePage;
      this.loginPage = LoginPage;
      this.registerPage = RegisterPage;

      this.authProvider.checkAuthentication().then((res)=>{
        console.log("res : " + res)
        if (res === '') this.rootPage  = LoginPage;
        else this.rootPage  = HomePage;
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

    openPage(p) {
        this.rootPage = p;
    }

    myLogOut() {
        this.authProvider.logout();
        this.navCtrl.setRoot(LoginPage);
    }

}
