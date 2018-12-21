import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IGeolocation } from '../../models/geolocation';
import { map } from 'rxjs/operators';
import { IPerson } from '../../models/person';
import { ITruck } from '../../models/truck';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath: string = '/UPC';
  private geolocTestData: string = '../assets/geolocations.json';

  constructor(private db: AngularFireDatabase, private _http: HttpClient) { }

  getEmployeeListReadable(): Observable<IPerson[]> {
    return this.db.list<IPerson>('/UPC/Drivers').valueChanges();
  }

  getEmployeeListWritable(): AngularFireList<IPerson[]> {
    return this.db.list('/UPC/Drivers');
  }

  getEmployeeListMetadata() {
    return this.db.list<IPerson>('/UPC/Drivers').snapshotChanges();
  }

  getTruckListReadable(): Observable<ITruck[]> {
    return this.db.list<ITruck>('/UPC/Trucks').valueChanges();
  }

  getTruckListWritable(): AngularFireList<ITruck[]> {
    return this.db.list('/UPC/Trucks');
  }

  getTruckListMetadata() {
    return this.db.list<ITruck>('/UPC/Trucks').snapshotChanges();
  }

  getGeolocations(): Observable<IGeolocation[]> {
    return this._http.get<IGeolocation[]>(this.geolocTestData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

}
