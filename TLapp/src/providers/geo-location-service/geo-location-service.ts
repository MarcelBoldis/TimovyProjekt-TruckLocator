import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { DriverDataServiceProvider } from '../driver-data-service/driver-data-service';

@Injectable()
export class GeoLocationServiceProvider {
  
  private allTrackCoordinations: any[];
  driversName: string;

  setDriversName(name: string){
    this.driversName = ""+name;
  }

  constructor(private backgroundGeolocation: BackgroundGeolocation, private driverDataService: DriverDataServiceProvider  ) {
    this.allTrackCoordinations = [];
  }

  startTracking() {
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
        this.driverDataService.updateTrackCoordinations(location.latitude, location.longitude, this.driversName);
        this.allTrackCoordinations.push({ latitude: location.latitude, longitude: location.longitude });
      });

    this.backgroundGeolocation.start();
  }

  stopTracking() {
    this.backgroundGeolocation.finish();
    this.backgroundGeolocation.stop();
  }

  manuallyUpdateCoordinations(){
    this.driverDataService.changeAllTrackCoordinations(this.allTrackCoordinations, this.driversName);
  }

}
