import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuelCostsPage } from './fuel-costs';

@NgModule({
  declarations: [
    FuelCostsPage,
  ],
  imports: [
    IonicPageModule.forChild(FuelCostsPage),
  ],
})
export class FuelCostsPageModule {}
