import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  persons = [];
  driversList = [];
  truckList = [];

  constructor(public db: AngularFireDatabase,
    public fbService: FirebaseService,
    public fb: FormBuilder) { }
    addNewTaskForm = this.fb.group({
      wayName: ['', Validators.required],
      driverName: ['', Validators.required],
      carName: ['', Validators.required],
      wayDate: ['', Validators.required],
      addressStart: ['', Validators.required],
      addressFinish: ['', Validators.required],
      wayDescript: ['', Validators.required],
    });
  ngOnInit() {
    this.db.list('/companies/softec/trucks').valueChanges().subscribe(trucks => {
      this.truckList = trucks;
    });

    this.db.list('/companies/softec').valueChanges().subscribe(drivers => {
      this.persons = drivers;
      this.filtredDrivers(this.persons);
    });

  }

  filtredDrivers(persons) {
    this.driversList = this.persons.filter(
      driver => driver.specialisation === 'Vodič');
  }
}
