import { Component } from '@angular/core';
import { NavController, ModalController, Modal } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TrackInterface, TasksInterface, CoordinationsInterface, FuelCostsInterface } from '../../interfaces/trackInterface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  truckerData: Observable<any[]>;
  trackDataInfo: Observable<any>;
  openTask: boolean = false;
  fakeTasks: TasksInterface[] = [{
    isDone: false,
    description: "Vylozit pivo",
    place: "Decodom",
    fullAdress: "Namestovo, Hviezdoslavova 54"
  },
  {
    isDone: false,
    description: "Vylozit pivo",
    place: "Decodom",
    fullAdress: "Namestovo, Hviezdoslavova 54"
  }]
  fakeCurrentCoords: CoordinationsInterface = {
    lat: 20,
    long: 20,
  }
  fakeFuelCosts: FuelCostsInterface = {
    fuelAmount:0,
    gasStation:"",
    price:0
  }
  fakeTrack: TrackInterface = {
    direction: "BA-ZA",
    date: "10.16.2018",
    description: "Vylozit 20 kartonov piva pre spolocnost Pilsner Urquell. Je potrebne zobrat vsetky palety cestou spat",
    image: "http://icons.iconarchive.com/icons/flat-icons.com/flat/256/Beer-icon.png",
    truckDriver: "Maros Lipa",
    truck: "IVECO HY 700 (NO3744SK)",
    tasks: this.fakeTasks,
    coordinations: this.fakeCurrentCoords,
    fuelCosts: this.fakeFuelCosts,
  }
  constructor(public navCtrl: NavController, private db: AngularFireDatabase, private modalControler: ModalController) {
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
    this.db.object('/UPC/Drivers/' + 'Maros Lipa/').update({
      track: this.fakeTrack
    });
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
