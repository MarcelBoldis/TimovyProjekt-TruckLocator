import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-component',
  templateUrl: 'chat.html'
})
export class ChatComponent {

  messages: Observable<any[]>;
  newMessage: string;
  myDate:any;

  constructor(private db: AngularFireDatabase) {
    this.messages = this.db.list('/UPC/Drivers/' + 'Maros Lipa/chat').valueChanges();
    this.newMessage = "";
    this.myDate = new Date();
  }

  addMessageToChat() {
    if (this.newMessage != '') {
      this.db.list('/UPC/Drivers/' + 'Maros Lipa/chat').push({
        time: new Date().getTime(),
        from: 'driver',
        text: this.newMessage
      });
      this.newMessage = "";
    }
  }


}
