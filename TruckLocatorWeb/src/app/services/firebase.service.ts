import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private basePath: string = '/companies/softec';

  employeeList = [];

  constructor(private db: AngularFireDatabase) { }

  getEmployeeList() {
    this.db.list('/companies/softec').valueChanges().subscribe(drivers => {
      this.employeeList = drivers;
    });
    return this.employeeList;
  }
}
