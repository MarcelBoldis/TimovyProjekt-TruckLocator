import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeolocationsModel } from './GeolocationsModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath: string = '/UPC';
  private geolocTestData: string = '../assets/geolocations.json';

  employeeList = [];
  

  constructor(private db: AngularFireDatabase, private _http: HttpClient) { }

  getEmployeeList() {
    this.db.list('/UPC/Drivers').valueChanges().subscribe(drivers => {
      this.employeeList = drivers;
    });
    return this.employeeList;
  }

  getGeolocations(): Observable<GeolocationsModel[]> {    
    return this._http.get<GeolocationsModel[]>(this.geolocTestData, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

}
