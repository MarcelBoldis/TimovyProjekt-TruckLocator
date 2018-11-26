import { NgModule } from '@angular/core';
 import { IonicPageModule } from 'ionic-angular';
 import { HomePage } from './home';
 import { ChatComponent } from '../../components/chat/chat';
 

@NgModule({
  declarations: [
   HomePage,
   ChatComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
