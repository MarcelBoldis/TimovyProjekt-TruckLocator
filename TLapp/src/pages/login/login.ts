import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserInterface } from '../../interfaces/userInterface';
import { AngularFireAuth } from 'angularfire2/auth';

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

  user = {} as UserInterface;
  constructor(
    private toast: ToastController,
    private ofAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
 

    // if(this.ofAuth.auth.currentUser != null){
    //   this.navCtrl.setRoot('HomePage');
    //   return;
    // }
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user : UserInterface){    
    var that= this;
    var splittedLogin = user.userName.split("@");
    var company = splittedLogin[1].substring(0, splittedLogin[1].indexOf("."));
    if(!splittedLogin[0].includes(company)){
      try{
        that.ofAuth.auth.setPersistence("local")
        .then(function() {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return that.ofAuth.auth.signInWithEmailAndPassword(user.userName, user.password);
        })
        .then(success => {
          //overenie ci je to vodic a nie zamestnavatel
            that.navCtrl.setRoot('HomePage');
        })
        .catch(error => {
          // Handle Errors here.
          console.log(error.code + error.message);
          user.userName = "";
          user.password = "";
          that.toast.create({
            message: 'Zadali ste nesprávne prihlasovacie údaje',
            duration: 3000
          }).present();
        });
      }catch(e){
          console.error(e);
          user.userName = "";
          user.password = "";
          that.toast.create({
            message: 'Zadali ste nesprávne prihlasovacie údaje',
            duration: 3000
          }).present();
      }
    }else{
      user.userName = "";
      user.password = "";
      that.toast.create({
        message: 'Zadali ste nesprávne prihlasovacie údaje',
        duration: 3000
      }).present();
    }
  }

  resetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

}
