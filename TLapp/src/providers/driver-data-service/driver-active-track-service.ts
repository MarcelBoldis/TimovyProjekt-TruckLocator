import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DriversProfileServiceProvider } from '../providers-drivers-profile-service/drivers-profile-service';

@Injectable()
export class DriverActiveTrackServiceProvider {

  previousLat: number;
  prevousLong: number;
  trackDrivenDistance: number;

  constructor(private db: AngularFireDatabase, private driversProfileService: DriversProfileServiceProvider) { this.trackDrivenDistance = 0; }


  updateTrackCoordinations(latitude: number, longitude: number, trackKey: string) {
    this.db.list(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/coordinations').push({
      latitude: latitude,
      longitude: longitude
    });
    if (this.previousLat && this.prevousLong) {
      this.updateTrackDrivenDistance(this.calculateDistanceBetweenTwoPoints(this.previousLat, this.prevousLong, latitude, longitude, 'K'), trackKey)
    }
    this.previousLat = latitude;
    this.prevousLong = longitude;
  }

  updateTrackDrivenDistance(distanceAddition: number, trackKey: string) {
    this.trackDrivenDistance += distanceAddition;
    this.db.object(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/drivenDistance').set(this.trackDrivenDistance);
  }

  activeTrackWasFinished(trackKey: string) {
    this.driversProfileService.activeTrackWasFinished(trackKey);
  }

  setDriversActiviryStatus(isActive: boolean) {
    this.db.object(this.driversProfileService.driversURL + '/isActive').set(isActive);
  }
  setTrackToActive(trackKey: string) {
    this.db.object(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/isActive').set(true);
  }

  calculateDistanceBetweenTwoPoints(lat1: number, lon1: number, lat2: number, lon2: number, unit: string): number {
    if ((lat1 == lat2) && (lon1 == lon2)) { return 0; }
    else {
      let radlat1 = Math.PI * lat1 / 180;
      let radlat2 = Math.PI * lat2 / 180;
      let theta = lon1 - lon2;
      let radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      if (dist > 1) { dist = 1; }

      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;

      if (unit == "K") { dist = dist * 1.609344 }

      return dist;
    }
  }

}
