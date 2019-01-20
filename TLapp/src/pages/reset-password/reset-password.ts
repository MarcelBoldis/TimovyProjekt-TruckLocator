import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email: string = "";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ofAuth: AngularFireAuth,
              private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword() {
    var that = this;
    this.ofAuth.auth.sendPasswordResetEmail(this.email).then(function(success){
      that.toast.create({
        message: 'Email pre resetovanie hesla bol úspešne odoslaný na vašu mailovú adresu.',
        duration: 3000
      }).present();
    }).catch(function(error){
      console.log(error.code + "           " + error.message);
      that.toast.create({
        message: 'Email pre resetovanie hesla sa nepodarilo odoslať. Prosím vyplnte mailovú adresu s korektným mailom a skúste to znova.',
        duration: 3000
      }).present();
    });
  }

}
