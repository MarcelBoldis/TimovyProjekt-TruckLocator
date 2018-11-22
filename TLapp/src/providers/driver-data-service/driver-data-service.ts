import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DriverDataServiceProvider {

  constructor(private db: AngularFireDatabase) { }

  updateTrackCoordinations(latitude: number, longitude: number){
      this.db.list('/UPC/Drivers/' + 'Maros Lipa/track/coordinations').push({
        latitude: latitude,
        longitude: longitude
      });
  }

  changeAllTrackCoordinations(allTrackCoordinations: any[]){
    this.db.object('/UPC/Drivers/' + 'Maros Lipa/track/coordinations').set(allTrackCoordinations);
  }

}
