import { Component } from '@angular/core';
import { GeoLocationServiceProvider } from '../../providers/geo-location-service/geo-location-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'geo-location',
  templateUrl: 'geo-location.html'
})
export class GeoLocationComponent {

  buttonTitle: string;
  
  constructor(private geoLocationService: GeoLocationServiceProvider, private toastCtrl: ToastController) { this.buttonTitle = "start" }

  geolocationButtonClicked() {
    if (this.buttonTitle === 'start') { this.startTracking() }
    else { this.stopTracking() }
  }
  startTracking() {
    this.geoLocationService.startTracking();
    this.buttonTitle = "stop";
    this.presentToastAboutTrackingStatus("You are beeing tracked!");
  }

  stopTracking() {
    this.geoLocationService.stopTracking();
    this.buttonTitle = "start";
    this.presentToastAboutTrackingStatus("Tracking stopped!");
  }

  presentToastAboutTrackingStatus(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  setCoordinationsManually(){ this.geoLocationService.manuallyUpdateCoordinations(); }

}
