import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 
import { Observable } from 'rxjs';
import { IPerson } from '../../models/person';
import { ITruck } from '../../models/truck';
import { AngularFireAuth } from 'angularfire2/auth';
import { ITrack } from 'src/models/track';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  basePath: string;
  //private geolocTestData: string = '../assets/geolocations.json';

  constructor(private db: AngularFireDatabase) {}

  setCompany(company: string) {
     this.basePath = company;
   }

   getCompany() {
     return this.basePath;
   }

  getEmployeeListReadable(): Observable<IPerson[]> {
    return this.db.list<IPerson>(this.basePath + '/Drivers').valueChanges();
  }

  getEmployeeListWritable(): AngularFireList<IPerson[]> {
    return this.db.list(this.basePath +'/Drivers');
  }

  getEmployeeListMetadata() {
    return this.db.list<IPerson>(this.basePath + '/Drivers').snapshotChanges();
  }
  getEmployeeFiredListMetadata() {
    return this.db.list<IPerson>(this.basePath + '/historyData/Employee').snapshotChanges();
  }

  getTruckListReadable(): Observable<ITruck[]> {
    return this.db.list<ITruck>(this.basePath + '/Trucks').valueChanges();
  }

  getTruckListWritable(): AngularFireList<ITruck[]> {
    return this.db.list(this.basePath + '/Trucks');
  }

  getTruckListMetadata() {
    return this.db.list<ITruck>(this.basePath + '/Trucks').snapshotChanges();
  }

  // getGeolocations(): Observable<IGeolocation[]> {
  //   return this._http.get<IGeolocation[]>(this.geolocTestData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  // }

  getActiveEmployees(): Observable<IPerson[]> {
    return this.db.list<IPerson>(this.basePath + '/Drivers', ref => ref.orderByChild('isActive').equalTo(true)).valueChanges();
  }

  getFinishedTracks(): Observable<ITrack[]>{
    return this.db.list<ITrack>(this.basePath + '/stats/finishedTracks').valueChanges();
  }

  // getActiveTrackOfEmployee(employeeId): Observable<ITrack[]> {
  //   return this.db.list<ITrack>(this.basePath + '/Drivers/' + employeeId + '/tracks', ref => ref.orderByChild('isActive').equalTo(true)).valueChanges();
  // }

}
