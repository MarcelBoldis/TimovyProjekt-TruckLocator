import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FuelCostsInterface } from '../../interfaces/trackInterface';

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
  updatedFuelCosts: FuelCostsInterface = {
    fuelAmount: null,
    gasStation: null,
    price: null
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FuelCostsPage');
  }

  ionViewWillLoad(){
    this.dataFromHomePage = this.navParams.get('data');
  }

  dismiss() {
    this.view.dismiss(this.updatedFuelCosts);
  }
}
