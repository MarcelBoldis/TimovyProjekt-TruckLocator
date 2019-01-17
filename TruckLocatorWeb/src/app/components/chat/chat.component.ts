import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ChatMessage } from 'src/app/interfaces/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatMessages: ChatMessage[];
  driversKey: string;
  newMessageText: string;

  @ViewChild('scrollMe') private chatScrollView: ElementRef;
  @Input() set setDriversKey(dkey: string){
    this.driversKey = dkey;
    this.chatService.loadMessages(this.driversKey).subscribe(
      (data:any) => {
        this.chatMessages = data;
      }
    );
  };

  constructor(private chatService: ChatService) { 
  }

  ngOnInit() { }

  sendMessage(){
    this.chatService.sendMessage(this.newMessageText, this.driversKey);
    this.newMessageText = "";
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {this.chatScrollView.nativeElement.scrollTop = this.chatScrollView.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
