import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewEmployeeComponent } from 'src/app/dialogs/new-employee/new-employee.component';

@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {

  drivers = 0;
  managers = 0;
  dispatchers = 0;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addEmployee() {
    alert('Pridanie zamestnanca');
  }

  getManagers(data: number) {
    this.managers = data;
  }
  getDispatchers(data: number) {
    this.dispatchers = data;
  }
  getDrivers(data: number) {
    this.drivers = data;
  }

  addNewEmployee() {
    const dialogRef = this.dialog.open(NewEmployeeComponent, {
      width: '50%',
    });
  }
}
