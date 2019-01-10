import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';
import { NewEmployeeComponent } from '../../dialogs/new-employee/new-employee.component';
import { IPerson } from '../../../models/person';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  company = 'UPC';
  employeeMetadataList: any = [];
  employeeList: IPerson[];
  managerCount = 0;
  driverCount = 0;
  dispatcherCount = 0;
  employeesControl = new FormControl();
  filteredEmployees: Observable<IPerson[]>;

  @Output() managers = new EventEmitter<number>();
  @Output() drivers = new EventEmitter<number>();
  @Output() dispatchers = new EventEmitter<number>();
  @ViewChildren('driverBox') driverBox: ElementRef;


  constructor(public dialog: MatDialog,
    public fbService: FirebaseService,
    private af: AngularFireDatabase) { }

  private _filterEmployees(value: string): IPerson[] {
    const filterValue = value.toLowerCase();
    return this.employeeList.filter(employee => 
      (employee.lastName.toLowerCase().indexOf(filterValue) === 0) 
      || (employee.firstName.toLowerCase().indexOf(filterValue) === 0)
      || (employee.firstName + " " + employee.lastName).toLowerCase().indexOf(filterValue) === 0)
  }

  ngOnInit() {
    this.fbService.getEmployeeListReadable().subscribe(drivers => {
      this.employeeList = drivers;
      console.log("here");
      
      console.log(this.employeeList);
      
      this.filteredEmployees = this.employeesControl.valueChanges
      .pipe(startWith(''),
        map(inputText => inputText ? this._filterEmployees(inputText) : this.employeeList)
      );
      this.countRoles();
      console.log(this.employeeList);
      this.readDriversPhotos(this.employeeList);
    });

    this.fbService.getEmployeeListMetadata().subscribe(drivers => {
      this.employeeMetadataList = drivers;
    });
  }

  readDriversPhotos(drivers) {
    drivers.forEach(driver => {
    var storage = firebase.storage();
    var pathReference = storage.ref("Centarova.jpg");
    pathReference.getDownloadURL().then(function(url) {
      driver.image = url;
      });
    });
  }

  countRoles() {
    this.driverCount = 0;
    this.managerCount = 0;
    this.dispatcherCount = 0;
    console.log(this.employeeList);

    this.employeeList.filter(value => {
      if (value.specialisation === 'Vodič') {
        this.driverCount++;
      }
      if (value.specialisation === 'Manažér') {
        this.managerCount++;
      }
      if (value.specialisation === 'Dispečér') {
        this.dispatcherCount++;
      }
    });

    this.managers.emit(this.managerCount);
    this.drivers.emit(this.driverCount);
    this.dispatchers.emit(this.dispatcherCount);
  }

  showInfo(index: number) {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '50%',
      data: {
        data: this.employeeList[index],
        edit: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  showEdit(index: number) {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '50%',
      data: {
        data: this.employeeList[index],
        edit: true,
        clickedIndex: this.employeeMetadataList[index].key
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  deleteEmployee(event: any, index: number) {
    const specificKey = this.employeeMetadataList[index].key;
    this.af.object(`${this.company}/historyData/Employee/${specificKey}`).set(this.employeeList[index]);
    this.af.object(`${this.company}/Drivers/${specificKey}`).remove();
  }
}
