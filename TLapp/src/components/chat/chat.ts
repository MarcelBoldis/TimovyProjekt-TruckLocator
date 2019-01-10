import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { DriversProfileServiceProvider } from '../../providers/providers-drivers-profile-service/drivers-profile-service';

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.html'
})
export class ChatComponent {

  messages: Observable<any[]>;
  newMessage: string;
  myDate: any;
  @ViewChild('messagesArea') messageArea: ElementRef;

  constructor(private db: AngularFireDatabase, private driversProfileService: DriversProfileServiceProvider) {
    this.initializeMessages();
  }

  initializeMessages() {
    this.messages = this.db.list(this.driversProfileService.driversURL + '/chat').valueChanges();
    this.messages.subscribe(() => this.scrollToBottomInMessageArea());
    this.newMessage = "";
    this.myDate = new Date();
  }

  addMessageToChat() {
    if (this.newMessage != '') {
      this.db.list(this.driversProfileService.driversURL + '/chat').push({
        time: new Date().getTime(),
        from: 'driver',
        text: this.newMessage
      });
      this.newMessage = "";
    }
  }
  scrollToBottomInMessageArea() {
    this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
  }

}
