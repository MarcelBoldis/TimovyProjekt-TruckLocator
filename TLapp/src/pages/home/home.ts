import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Modal, NavParams } from 'ionic-angular';
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
  userName: string[] = [];
  usernameFormated: boolean;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase,
    private modalControler: ModalController,
    private ofAuth: AngularFireAuth,
    public navParams: NavParams) {
    this.usernameFormated = false;

    // this.userName[0] = "Igor";
    // this.userName[1] = "Rosa";
    // this.usernameFormated = true;

    if (ofAuth.auth.currentUser) {
      this.getNameFromEmailForm(ofAuth.auth.currentUser.email);
      this.trackDataInfo = this.db.object('/UPC/Drivers/' + this.userName[0] + " " + this.userName[1] + '/tracks/track0').valueChanges();
      this.trackDataInfo.subscribe()
    }
  }
  openFuelCostsModal() {
    const dataForModal = { dataMessage: "hey LaLALALa" };
    const fuelCostsModal: Modal = this.modalControler.create('FuelCostsPage', { data: dataForModal });
    fuelCostsModal.present();
    fuelCostsModal.onDidDismiss((data) => {
      this.updateFuelCosts(data);
    });
  }
  getNameFromEmailForm(usernameEmail: string) {
    usernameEmail = "" + usernameEmail.replace("@tl.sk", "");
    this.userName = usernameEmail.split(".")
    this.userName[0] = this.userName[0].charAt(0).toUpperCase() + this.userName[0].slice(1);
    this.userName[1] = this.userName[1].charAt(0).toUpperCase() + this.userName[1].slice(1);
    this.usernameFormated = true;
  }

  openTasks() {
    this.openTask = !this.openTask;
  }

  updateFuelCosts(updatedFuelCosts: FuelCostsInterface) {
    this.db.object('/UPC/Drivers/' + this.userName[0] + " " + this.userName[1] + '/tracks/track0/fuelCosts/').update({
      fuelAmount: updatedFuelCosts.fuelAmount,
      price: updatedFuelCosts.price,
      gasStation: updatedFuelCosts.gasStation
    });
  }

  updateTasks(index: number, checkedStatus: boolean) {
    this.db.object('/UPC/Drivers/' + this.userName[0] + " " + this.userName[1] + '/tracks/track0/tasks/' + index).update({
      done: !checkedStatus
    });
  }

  logOut() {
    var that = this;
    this.ofAuth.auth.signOut().then(success => {
      that.navCtrl.setRoot("LoginPage");
    });
  }
}
