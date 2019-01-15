import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Modal, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FuelCostsInterface } from '../../interfaces/trackInterface';
import { AngularFireAuth } from 'angularfire2/auth';
import { DriversProfileServiceProvider } from '../../providers/providers-drivers-profile-service/drivers-profile-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  truckerData: Observable<any[]>;
  trackDataInfo: any;
  openTask: boolean = false;
  isDriverActive: boolean;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase,
    private modalControler: ModalController,
    private driversProfileService: DriversProfileServiceProvider,
    private ofAuth: AngularFireAuth,
    public navParams: NavParams) {
    if (ofAuth.auth.currentUser) {
      driversProfileService.setDriversURL(ofAuth.auth.currentUser.email);
      driversProfileService.loadTracks();
      this.db.object(this.driversProfileService.driversURL + '/isActive').valueChanges().subscribe((val:boolean) => this.isDriverActive = val);
    }
  }
  openFuelCostsModal(trackKey: string) {
    const dataForModal = { dataMessage: "hey LaLALALa" };
    const fuelCostsModal: Modal = this.modalControler.create('FuelCostsPage', { data: dataForModal });
    fuelCostsModal.present();
    fuelCostsModal.onDidDismiss((data) => {
      this.updateFuelCosts(data , trackKey);
    });
  }

  openTasks() {
    this.openTask = !this.openTask;
  }

  updateFuelCosts(updatedFuelCosts: FuelCostsInterface, trackKey:string) {
    console.log(updatedFuelCosts);
    this.db.object(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/fuelCosts/').update({
      fuelAmount: updatedFuelCosts.fuelAmount,
      price: updatedFuelCosts.price,
      gasStation: updatedFuelCosts.gasStation
    });
  }

  updateTasks(index: number, checkedStatus: boolean, trackKey:string) {
    this.db.object(this.driversProfileService.driversURL + '/tracks/' + trackKey + '/tasks/' + index).update({
      done: !checkedStatus
    });
  }

  logOut() {
    var that = this;
    this.ofAuth.auth.signOut().then(success => {
      that.navCtrl.setRoot("LoginPage");
    });
  }
  addFekeTrack(){
    // this.db.object('/UPC/stats/finishedTacks/').valueChanges().subscribe(item => {
    //   this.db.object("/UPC/Drivers/jojo-kojo-5/"+ '/tracks/').update(item);
    // });
  }
}
