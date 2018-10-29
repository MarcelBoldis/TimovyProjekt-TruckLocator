import { Component } from '@angular/core';
import {IonicPage, NavController, ModalController, Modal} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FuelCostsInterface } from '../../interfaces/trackInterface';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  truckerData: Observable<any[]>;
  trackDataInfo: Observable<any>;
  openTask: boolean = false;

  constructor(public navCtrl: NavController,
    private db: AngularFireDatabase,
    private modalControler: ModalController,
    private ofAuth: AngularFireAuth) {
    this.trackDataInfo = this.db.object('/UPC/Drivers/' + 'Maros Lipa/track').valueChanges();
    this.trackDataInfo.subscribe(data => console.log(data))
  }
  openFuelCostsModal(){
    const dataForModal = {dataMessage: "hey LaLALALa"};
    const fuelCostsModal: Modal = this.modalControler.create('FuelCostsPage',{ data: dataForModal});
    fuelCostsModal.present();
    fuelCostsModal.onDidDismiss((data) => {
      this.updateFuelCosts(data);
    });
  }
  addTrackToDatabase() {
    // this.db.object('/UPC/Drivers/' + 'Maros Lipa/').update({
    //   track: this.fakeTrack
    // });
  }
  openTasks() {
    this.openTask = !this.openTask;
  }

  updateFuelCosts(updatedFuelCosts: FuelCostsInterface){
    this.db.object('/UPC/Drivers/' + 'Maros Lipa/' + 'track/fuelCosts/').update({
      fuelAmount: updatedFuelCosts.fuelAmount,
      price: updatedFuelCosts.price,
      gasStation: updatedFuelCosts.gasStation
    });
  }

  updateCucumber(index: number, checkedStatus: boolean) {
    this.db.object('/UPC/Drivers/' + 'Maros Lipa/' + 'track/tasks/' + index).update({
      done: !checkedStatus
    });
  }
}
