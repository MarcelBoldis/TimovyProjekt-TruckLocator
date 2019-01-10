import { Component, Input } from '@angular/core';
import { GeoLocationServiceProvider } from '../../providers/geo-location-service/geo-location-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'geo-location',
  templateUrl: 'geo-location.html'
})
export class GeoLocationComponent {

  @Input() trackKey: string;
  @Input() buttonTitle: string;
  
  constructor(private geoLocationService: GeoLocationServiceProvider, private toastCtrl: ToastController) { 
  }
  geolocationButtonClicked() {
    if (this.buttonTitle === 'start') { this.startTracking() }
    else { this.stopTracking() }
  }
  startTracking() {
    this.buttonTitle = "stop";
    this.geoLocationService.startTracking(this.trackKey);    
    this.presentToastAboutTrackingStatus("You are beeing tracked!");
  }

  stopTracking() {
    this.buttonTitle = "start";
    this.geoLocationService.stopTracking(this.trackKey);
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

}
