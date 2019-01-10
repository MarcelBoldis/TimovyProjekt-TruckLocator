import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { TrackInterface } from '../../interfaces/trackInterface';

@Injectable()
export class DriversProfileServiceProvider {

  driversURL: string;
  driversKey: string;
  driversEmployerCompany: string;
  allTracks: any;

  constructor(private db: AngularFireDatabase) {
  }

  setDriversURL(loginEmail: string){
    let splittedLogin = loginEmail.split("@");
    this.driversKey = splittedLogin[0];
    this.driversEmployerCompany = splittedLogin[1].substring(0, splittedLogin[1].indexOf(".")).toUpperCase();
    this.driversURL = '/'+ this.driversEmployerCompany +'/Drivers/' + this.driversKey;
  }

  loadTracks(){
    this.db.list(this.driversURL + '/tracks/').snapshotChanges().subscribe(items => {
      this.allTracks = items;
    });
  }

  removeActiveTrack(trackKey:string){
    this.db.list(this.driversURL + '/tracks/').remove(trackKey);
  }

  activeTrackWasFinished(trackKey:string){
    this.allTracks.forEach((track:any) => {
      if(track.key === trackKey){
        this.db.list('/'+this.driversEmployerCompany + '/stats/finishedTacks/').push(track.payload.val()).then(
           () =>{ this.removeActiveTrack(trackKey);}
          );
      }
    });
    
  }

}
