import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTruckComponent } from 'src/app/dialogs/new-truck/new-truck.component';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TruckDetailComponent } from './truck-detail/truck-detail.component';

@Component({
  selector: 'app-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})
export class TrucksComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private router: Router,
    private afAuth: AngularFireAuth) {
  }
  @ViewChild('truckDetail') truckDetail: TruckDetailComponent;

  ngOnInit() {
  }
  addNewTruck() {
    const dialogRef = this.dialog.open(NewTruckComponent, {
      width: '50%',
    });
    const ss = dialogRef.componentInstance.photoUploaded.subscribe(() => {
      this.truckDetail.readTrucksPhotos(this.truckDetail.truckList);
      this.truckDetail.picturesAreReady = true;
      dialogRef.close();
    });
  }

}
