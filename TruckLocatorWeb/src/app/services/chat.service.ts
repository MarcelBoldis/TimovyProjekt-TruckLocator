import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private basePath: string = '';
  constructor(private db: AngularFireDatabase, public fbService: FirebaseService) {
    this.basePath = this.fbService.getCompany();
   }
  sendMessage(messageText: string, driversKey: string){
    this.db.list(this.basePath + '/Chat/' + driversKey).push({
      time: new Date().getTime(),
      from: 'dispečer',
      text: messageText
    });
  }
  loadMessages(driversKey: string){
    return this.db.list(this.basePath + '/Chat/' + driversKey).valueChanges();
  }
}
