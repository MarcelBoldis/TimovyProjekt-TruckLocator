import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EmployeeListDetailDialogComponent } from 'src/app/dialogs/employee-list-detail-dialog/employee-list-detail-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  activeDrivers = [];
  @Output() driverClick = new EventEmitter();
  constructor( public dialog: MatDialog ) { }

  ngOnInit() {
    this.activeDrivers.push({'name': 'Jan Novak', 'route': 'BA - KE', 'routeId': 1});
    this.activeDrivers.push({'name': 'Jozef Stary', 'route': 'BA - KE', 'routeId': 2});
    this.activeDrivers.push({'name': 'Juraj Peterka', 'route': 'BA - KE', 'routeId': 3});
    this.activeDrivers.push({'name': 'Marek Kutaj', 'route': 'BA - KE', 'routeId': 4});
    this.activeDrivers.push({'name': 'Ondrej Prazenica', 'route': 'BA - KE', 'routeId': 5});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 6});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 7});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 8});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 9});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 10});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 11});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE', 'routeId': 12});
  }

  showRoute(driver: number) {
    this.driverClick.emit(this.activeDrivers[driver].routeId);
  }

  driverButtonClicked(index: number) {
      const dialogRef = this.dialog.open(EmployeeListDetailDialogComponent, {
        width: '800px',
        data: {name: this.activeDrivers[index].name, route: this.activeDrivers[index].route}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }
}
