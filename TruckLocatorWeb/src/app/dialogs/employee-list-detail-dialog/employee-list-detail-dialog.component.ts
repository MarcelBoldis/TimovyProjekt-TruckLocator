import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-employee-list-detail-dialog',
  templateUrl: './employee-list-detail-dialog.component.html',
  styleUrls: ['./employee-list-detail-dialog.component.scss']
})
export class EmployeeListDetailDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeListDetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
