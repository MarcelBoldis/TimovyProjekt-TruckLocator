import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DriversProfileServiceProvider } from '../providers-drivers-profile-service/drivers-profile-service';

@Injectable()
export class DriverActiveTrackServiceProvider {


  constructor(private db: AngularFireDatabase, private driversProfileService: DriversProfileServiceProvider) { }


  updateTrackCoordinations(latitude: number, longitude: number) {
    this.db.list(this.driversProfileService.driversURL + '/tracks/' + this.driversProfileService.activeTrackKey + '/coordinations').push({
      latitude: latitude,
      longitude: longitude
    });
  }

  changeAllTrackCoordinations(allTrackCoordinations: any[]) {
    this.db.object(this.driversProfileService.driversURL + '/tracks/' + this.driversProfileService.activeTrackKey + '/coordinations').set(allTrackCoordinations);
  }
  activeTrackWasFinished(){
    this.driversProfileService.activeTrackWasFinished();
  }

  setDriversActiviryStatus(isActive: boolean){
    this.db.object(this.driversProfileService.driversURL + '/isActive').set(isActive);
  }

}
