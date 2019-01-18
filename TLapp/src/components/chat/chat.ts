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
  myDate: Date;
  oldScrollHeight: number;
  @ViewChild('scrollMe') private chatScrollView: ElementRef;

  constructor(private db: AngularFireDatabase, private driversProfileService: DriversProfileServiceProvider) {
    this.initializeMessages();
  }

  ngDoCheck() {
    if (this.chatScrollView) {
      if (this.oldScrollHeight !== this.chatScrollView.nativeElement.scrollHeight) {
        this.scrollToBottom()
        this.oldScrollHeight = this.chatScrollView.nativeElement.scrollHeight;
      }
    }
  }

  initializeMessages() {
    this.messages = this.db.list(this.driversProfileService.driversEmployerCompany + '/Chat/' + this.driversProfileService.driversKey).valueChanges();
    this.messages.subscribe();
    this.newMessage = "";
    this.myDate = new Date();
  }

  addMessageToChat() {
    if (this.newMessage != '') {
      this.db.list(this.driversProfileService.driversEmployerCompany + '/Chat/' + this.driversProfileService.driversKey).push({
        time: new Date().getTime(),
        from: 'vodič',
        text: this.newMessage
      });
      this.newMessage = "";
    }
  }

  scrollToBottom(): void {
    try {
      this.chatScrollView.nativeElement.scrollTop = this.chatScrollView.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
