import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'chat-component',
  templateUrl: 'chat.html'
})
export class ChatComponent {

  messages: Observable<any[]>;
  newMessage: string;
  myDate: any;
  userName: string;
  @ViewChild('messagesArea') messageArea: ElementRef;
  @Input() set setuserName(fullName: any) {
    this.userName = fullName[0] + " " + fullName[1];
    this.messages = this.db.list('/UPC/Drivers/' + this.userName + '/chat').valueChanges();
    this.messages.subscribe(() => this.scrollToBottomInMessageArea());
    this.newMessage = "";
    this.myDate = new Date();
  }

  constructor(private db: AngularFireDatabase) { }

  addMessageToChat() {
    if (this.newMessage != '') {
      this.db.list('/UPC/Drivers/' + this.userName + '/chat').push({
        time: new Date().getTime(),
        from: this.userName,
        text: this.newMessage
      });
      this.newMessage = "";
    }
  }
  scrollToBottomInMessageArea() {
    this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight;
  }

}
