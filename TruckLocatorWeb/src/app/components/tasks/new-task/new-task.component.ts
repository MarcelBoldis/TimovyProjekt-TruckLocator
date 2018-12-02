import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
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
  openExpand = true;
  addNewTaskForm = this.fb.group({
    wayName: ['', Validators.required],
    driverName: ['', Validators.required],
    carName: ['', Validators.required],
    wayDate: ['', Validators.required],
    addressStart: ['', Validators.required],
    addressFinish: ['', Validators.required],
    wayDescript: ['', Validators.required],
  });

  constructor(public fbService: FirebaseService,
              public fb: FormBuilder) { }


  ngOnInit() {
    this.fbService.getTruckListReadable().subscribe(trucks => {
      this.truckList = trucks;
    });

    this.fbService.getEmployeeListReadable().subscribe(drivers => {
      this.persons = drivers;
      this.filtredDrivers(this.persons);
    });
  }

  addRoute() {
    console.log(this.addNewTaskForm.value);
    this.openExpand = false;
  }

  createTrack() {
    console.log(this.addNewTaskForm.value);
  }

  filtredDrivers(persons) {
    this.driversList = this.persons.filter(
      driver => driver.specialisation === 'Vodič');
  }
}
