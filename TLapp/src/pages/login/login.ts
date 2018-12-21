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
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user : UserInterface){
    try{
      const result = this.ofAuth.auth.signInWithEmailAndPassword(user.userName, user.password);
      if(result){
        this.navCtrl.push('HomePage', { username: user.userName });
      }else{
        this.user.userName = "";
        this.user.password = "";
        this.toast.create({
          message: 'Zadali ste nesprávne údaje',
          duration: 3000
        }).present();
      }
    }catch(e){
        console.error(e);
        this.user.userName = "";
        this.user.password = "";
        this.toast.create({
          message: 'Zadali ste nesprávne údaje',
          duration: 3000
        }).present();
    }
  }

}
