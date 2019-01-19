import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EmployeeListDetailDialogComponent } from '../../../dialogs/employee-list-detail-dialog/employee-list-detail-dialog.component';
import { FirebaseService } from '../../../services/firebase.service';
import { ITrack } from 'src/models/track';
import { IPerson } from 'src/models/person';
import { ChatDialogComponent } from 'src/app/dialogs/chat-dialog/chat-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  activeDrivers: Array<IPerson> = [];
  shownTrack: ITrack;
  @Output() driverClick = new EventEmitter();

  constructor( public dialog: MatDialog, private dbService: FirebaseService) { }

  ngOnInit() {
    this.dbService.getActiveEmployees().subscribe(drivers => {
      this.activeDrivers = drivers;
    })
  }

  driverButtonClicked(driverId: string) {
    const activeDriver = this.activeDrivers.find(driver => driver.id == driverId);
    const activeTrack = this.getDriversActiveTrack(driverId);
      const dialogRef = this.dialog.open(EmployeeListDetailDialogComponent, {
        width: '800px',
        data: {
          name: activeDriver.firstName + " " + activeDriver.lastName, 
          addressStart: activeTrack.addressStart,
          addressFinish: activeTrack.addressFinish,
          carName: activeTrack.carName,
          tasks: activeTrack.tasks
      }});

      dialogRef.afterClosed().subscribe(result => {
      });
  }
  startChat(key: string) {
    this.dialog.open(ChatDialogComponent, {
      width: '50%',
      data: {
        specificKey: key
      }
    });
  }

  getDriversActiveTrack(driverId): ITrack {    
    const tracksObject = this.activeDrivers.find(driver => driver.id == driverId).tracks;        
    var tracks = Object.keys(tracksObject).map(function(e){
      Object.keys(tracksObject[e]).forEach(function(k){
         if(typeof tracksObject[e][k] == "object") {
          tracksObject[e][k] = Object.keys(tracksObject[e][k]).map(function(l){
             return tracksObject[e][k][l];
           });
         }
      });
      return tracksObject[e];
    });
    return tracks.find(track => track.isActive == true);
  }

  showDriversActiveTrack(driverId) {    
    this.shownTrack = this.getDriversActiveTrack(driverId);
    this.driverClick.emit(this.shownTrack);
  }
}
