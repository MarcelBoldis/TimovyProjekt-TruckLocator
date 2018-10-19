import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FuelCostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fuel-costs',
  templateUrl: 'fuel-costs.html',
})
export class FuelCostsPage {

  dataFromHomePage: any;
  updatedFuelCostsData: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuelCostsPage');
  }

  ionViewWillLoad(){
    this.dataFromHomePage = this.navParams.get('data');
  }

  dismiss() {
    this.updatedFuelCostsData = "new fuelCosts";
    this.view.dismiss(this.updatedFuelCostsData);
  }
}
