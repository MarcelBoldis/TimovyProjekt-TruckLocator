import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { LoginPage } from '../pages/login/login';
import { GeoLocationServiceProvider } from '../providers/geo-location-service/geo-location-service';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { DriverActiveTrackServiceProvider } from '../providers/driver-data-service/driver-active-track-service';
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { DriversProfileServiceProvider } from '../providers/providers-drivers-profile-service/drivers-profile-service';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule,
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GeoLocationServiceProvider,
    BackgroundGeolocation,
    DriverActiveTrackServiceProvider,
    DriversProfileServiceProvider
  ]
})
export class AppModule { }
