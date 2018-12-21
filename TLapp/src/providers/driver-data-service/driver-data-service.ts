import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DriverDataServiceProvider {


  constructor(private db: AngularFireDatabase) { }


  updateTrackCoordinations(latitude: number, longitude: number, driversName: string){
      this.db.list('/UPC/Drivers/' + driversName + '/tracks/track0/coordinations').push({
        latitude: latitude,
        longitude: longitude
      });
  }

  changeAllTrackCoordinations(allTrackCoordinations: any[], driversName: string){
    this.db.object('/UPC/Drivers/' + driversName + '/tracks/track0/coordinations').set(allTrackCoordinations);
  }

}
