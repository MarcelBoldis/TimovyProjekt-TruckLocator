import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild(Nav) nav: Nav;
  
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private ofAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      var that=this;
      this.ofAuth.auth.onAuthStateChanged(function(user){
        if (user){
          that.nav.setRoot('HomePage');
        }else{
         that.nav.setRoot('LoginPage');
        }
      }, function(error){
        console.log(error);
      });
    });
  }
}

