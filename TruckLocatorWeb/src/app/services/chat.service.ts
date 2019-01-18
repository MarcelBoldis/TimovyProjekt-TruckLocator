import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private basePath: string = '';
  constructor(private db: AngularFireDatabase, public companyService: CompanyService) {
    this.basePath = this.companyService.getCompany();
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
