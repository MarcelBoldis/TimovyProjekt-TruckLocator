import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { IPerson } from 'src/models/person';
import { ITruck } from 'src/models/truck';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  persons: IPerson[];
  driversList = [];
  truckList: ITruck[];
  employeeKeys = [];
  driverKeys = [];
  openExpand = true;

  company = 'UPC';

  addNewTaskForm = this.fb.group({
    wayName: ['', Validators.required],
    driverName: ['', Validators.required],
    carName: ['', Validators.required],
    wayDate: ['', Validators.required],
    addressStart: ['', Validators.required],
    addressFinish: ['', Validators.required],
    wayDescript: ['', Validators.required],
    tasks: this.fb.array([])
  });

  constructor(public fbService: FirebaseService,
              public fb: FormBuilder,
              private af: AngularFireDatabase,) { }


  ngOnInit() {
    this.fbService.getTruckListReadable().subscribe(trucks => {
      this.truckList = trucks;
    });

    this.fbService.getEmployeeListReadable().subscribe(drivers => {
      this.persons = drivers;
      this.filtredDrivers(this.persons);
    });

    this.fbService.getEmployeeListMetadata().subscribe(drivers => {
      this.employeeKeys = drivers.map(driver => {
        return driver.key;
      });
    })

  }

  addRoute() {
    console.log(this.addNewTaskForm.value);
    this.openExpand = false;
    this.tasks.push(this.createItem());
  }

  get tasks() {
    return this.addNewTaskForm.get('tasks') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      taskAddress: ['', Validators.required],
      // taskDate: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskTime: ['', Validators.required]
    });
  }

  createTrack() {
    const specificDriverKey = this.addNewTaskForm.get('driverName').value;
    const specificTrackKey = this.addNewTaskForm.get('wayName').value.toLowerCase() + specificDriverKey + Math.floor(Math.random() * 1000);
    this.addNewTaskForm.get('wayDate').setValue(this.addNewTaskForm.get('wayDate').value.toISOString());

    console.log(specificDriverKey);
    console.log(this.addNewTaskForm.value);
    
    this.af.object(`${this.company}/Drivers/${specificDriverKey}/tracks/${specificTrackKey}`).set(this.addNewTaskForm.value);
  }

  filtredDrivers(persons) {
    this.driversList = this.persons.filter(
      (driver, index) => {
        if (driver.specialisation === 'Vodič'){
          this.driverKeys.push(this.employeeKeys[index]);
          return driver;
        }
      }
    )
  }
}
