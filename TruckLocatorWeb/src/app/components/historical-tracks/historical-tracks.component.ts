import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ITrack } from 'src/models/track';
import { MatDialog } from '@angular/material';
import { EmployeeListDetailDialogComponent } from 'src/app/dialogs/employee-list-detail-dialog/employee-list-detail-dialog.component';

@Component({
  selector: 'app-historical-tracks',
  templateUrl: './historical-tracks.component.html',
  styleUrls: ['./historical-tracks.component.scss']
})
export class HistoricalTracksComponent implements OnInit {

  finishedTracks: Array<ITrack> = [];
  dysplayedTrackIndex: number = 0;

  constructor(private dbService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    this.dbService.getFinishedTracks().subscribe(tracks => {
      this.finishedTracks = tracks;
    })
  }

  selectTrack(index: number){
    this.dysplayedTrackIndex = index;
  }
  driverButtonClicked() {
      const dialogRef = this.dialog.open(EmployeeListDetailDialogComponent, {
        width: '800px',
        data: {
          name: this.finishedTracks[this.dysplayedTrackIndex].driverName, 
          addressStart: this.finishedTracks[this.dysplayedTrackIndex].addressStart,
          addressFinish: this.finishedTracks[this.dysplayedTrackIndex].addressFinish,
          carName: this.finishedTracks[this.dysplayedTrackIndex].carName,
          tasks: this.finishedTracks[this.dysplayedTrackIndex].tasks
      }});

      dialogRef.afterClosed().subscribe(result => {
      });
  }

}
