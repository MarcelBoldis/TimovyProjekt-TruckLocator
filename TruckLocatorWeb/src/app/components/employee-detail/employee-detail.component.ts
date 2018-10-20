import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EmployeeInfoComponent } from 'src/app/dialogs/employee-info/employee-info.component';
export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeList = [];
  managerCount = 0;
  driverCount = 0;
  dispatcherCount = 0;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  @Output() managers = new EventEmitter<number>();
  @Output() drivers = new EventEmitter<number>();
  @Output() dispatchers = new EventEmitter<number>();

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  constructor(public dialog: MatDialog) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
    this.employeeList.push({ role: 'driver', name: 'Marek Blaha', function: 'Vodič' });
    this.employeeList.push({ role: 'manager', name: 'Marcel Boldis', function: 'Manažér' });
    this.employeeList.push({ role: 'driver', name: 'Nikola  Carnogurska', function: 'Vodič' });
    this.employeeList.push({ role: 'dispatcher', name: 'Karol Trabalka', function: 'Dispečér' });
    this.employeeList.push({ role: 'manager', name: 'Lucia Centarova', function: 'Manažér' });
    this.employeeList.push({ role: 'dispatcher', name: 'Lucia Centarova', function: 'Dispečér' });
    this.employeeList.push({ role: 'driver', name: 'Lucia Centarova', function: 'Vodič' });
    this.employeeList.push({ role: 'driver', name: 'Lucia Centarova', function: 'Vodič' });
    this.employeeList.push({ role: 'dispatcher', name: 'Lucia Centarova', function: 'Dispečér' });
    this.employeeList.push({ role: 'driver', name: 'Lucia Centarova', function: 'Vodič' });
    this.employeeList.push({ role: 'manager', name: 'Lucia Centarova', function: 'Manažér' });

    this.employeeList.filter(value => {
      if (value.role === 'driver') {
        this.driverCount++;
      }
      if (value.role === 'manager') {
        this.managerCount++;
      }
      if (value.role === 'dispatcher') {
        this.dispatcherCount++;
      }
    });

    this.managers.emit(this.managerCount);
    this.drivers.emit(this.driverCount);
    this.dispatchers.emit(this.dispatcherCount);

  }

  showInfo(index: number) {
    const dialogRef = this.dialog.open(EmployeeInfoComponent, {
      width: '500px',
      data: {employee: this.employeeList[index]}
    });
  }
  showEdit(index: number) {
    const dialogRef = this.dialog.open(EmployeeInfoComponent, {
      width: '500px',
      data: {employee: this.employeeList[index]}
    });
  }

  deleteEmployee(index: number) {
    this.employeeList.splice(index, 1);
  }


}
