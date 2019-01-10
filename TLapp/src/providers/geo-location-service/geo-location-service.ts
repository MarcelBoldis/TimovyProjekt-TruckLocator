import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { DriverActiveTrackServiceProvider } from '../driver-data-service/driver-active-track-service';

@Injectable()
export class GeoLocationServiceProvider {
  
  private allTrackCoordinations: any[];

  constructor(private backgroundGeolocation: BackgroundGeolocation, private driverDataService: DriverActiveTrackServiceProvider  ) {
    this.allTrackCoordinations = [];
  }

  startTracking() {
    this.driverDataService.setDriversActiviryStatus(true);
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      interval: 1000,
    };

    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        this.driverDataService.updateTrackCoordinations(location.latitude, location.longitude);
        this.allTrackCoordinations.push({ latitude: location.latitude, longitude: location.longitude });
      });

    this.backgroundGeolocation.start();
  }

  stopTracking() {
    this.backgroundGeolocation.finish();
    this.backgroundGeolocation.stop();
    this.driverDataService.setDriversActiviryStatus(false);
    this.driverDataService.activeTrackWasFinished();
  }

  manuallyUpdateCoordinations(){
    this.driverDataService.changeAllTrackCoordinations(this.allTrackCoordinations);
  }

}
