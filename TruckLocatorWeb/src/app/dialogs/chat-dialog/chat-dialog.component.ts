import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.scss']
})
export class ChatDialogComponent implements OnInit {

  specificKey: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    ) { }

  ngOnInit() {
    this.specificKey = this.data.specificKey;
    console.log(this.specificKey);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
