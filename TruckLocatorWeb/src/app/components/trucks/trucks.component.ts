import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTruckComponent } from 'src/app/dialogs/new-truck/new-truck.component';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})
export class TrucksComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addNewTruck() {
    const dialogRef = this.dialog.open(NewTruckComponent, {
      width: '50%',
    });
  }

}
