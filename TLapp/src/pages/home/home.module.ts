import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ChatComponent } from '../../components/chat/chat';
import { GeoLocationComponent } from '../../components/geo-location/geo-location';

@NgModule({
  declarations: [
    HomePage,
    ChatComponent,
    GeoLocationComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
