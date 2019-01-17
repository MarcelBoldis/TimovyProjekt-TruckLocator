import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) { }
  sendMessage(messageText: string, driversKey: string){
    this.db.list('/UPC/Chat/' + driversKey).push({
      time: new Date().getTime(),
      from: 'dispečer',
      text: messageText
    });
  }
  loadMessages(driversKey: string){
    return this.db.list('/UPC/Chat/' + driversKey).valueChanges();
  }
}
