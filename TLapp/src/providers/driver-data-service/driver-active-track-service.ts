import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DriversProfileServiceProvider } from '../providers-drivers-profile-service/drivers-profile-service';

@Injectable()
export class DriverActiveTrackServiceProvider {


  constructor(private db: AngularFireDatabase, private driversProfileService: DriversProfileServiceProvider) { }


  updateTrackCoordinations(latitude: number, longitude: number, trackKey: string) {
    this.db.list(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/coordinations').push({
      latitude: latitude,
      longitude: longitude
    });
  }
  activeTrackWasFinished(trackKey:string) {
    this.driversProfileService.activeTrackWasFinished(trackKey);
  }

  setDriversActiviryStatus(isActive: boolean) {
    this.db.object(this.driversProfileService.driversURL + '/isActive').set(isActive);
  }
  setTrackToActive(trackKey: string) {
    this.db.object(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/isActive').set(true);
  }


}
