import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { TrackInterface } from '../../interfaces/trackInterface';

@Injectable()
export class DriversProfileServiceProvider {

  driversURL: string;
  driversKey: string;
  driversEmployerCompany: string;
  activeTrackKey: string;
  activeTrackData: TrackInterface;

  constructor(private db: AngularFireDatabase) {
  }

  setDriversURL(loginEmail: string){
    let splittedLogin = loginEmail.split("@");
    this.driversKey = splittedLogin[0];
    this.driversEmployerCompany = splittedLogin[1].substring(0, splittedLogin[1].indexOf(".")).toUpperCase();
    this.driversURL = '/'+ this.driversEmployerCompany +'/Drivers/' + this.driversKey;
  }

  findActiveTrack(){
    this.db.list(this.driversURL + '/tracks/').snapshotChanges().subscribe(items => {
      if(items[0]){
        this.activeTrackKey = items[0].key;
        this.activeTrackData =items[0].payload.val();
      }else{this.activeTrackKey = null}
    });
  }

  removeActiveTrackAndFinedNew(){
    this.db.list(this.driversURL + '/tracks/').remove(this.activeTrackKey).then(() => {
      this.activeTrackKey = null;
      this.findActiveTrack();
    });
    console.log("removing...");
  }

  activeTrackWasFinished(){
    this.db.list('/'+this.driversEmployerCompany + '/stats/finishedTacks/').push(this.activeTrackData).then(
     () =>{
      this.activeTrackData = null;
      this.removeActiveTrackAndFinedNew();
     }
    );
    
  }

}
