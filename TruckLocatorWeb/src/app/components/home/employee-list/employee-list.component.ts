import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EmployeeListDetailDialogComponent } from 'src/app/dialogs/employee-list-detail-dialog/employee-list-detail-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  activeDrivers = [];
  constructor( public dialog: MatDialog ) { }

  ngOnInit() {
    this.activeDrivers.push({'name': 'Jan Novak', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Jozef Stary', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Juraj Peterka', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Marek Kutaj', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Ondrej Prazenica', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
    this.activeDrivers.push({'name': 'Cyril Metod', 'route': 'BA - KE'});
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
