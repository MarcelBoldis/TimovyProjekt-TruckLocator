import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ITask } from 'src/models/task';

@Component({
  selector: 'app-employee-list-detail-dialog',
  templateUrl: './employee-list-detail-dialog.component.html',
  styleUrls: ['./employee-list-detail-dialog.component.scss']
})
export class EmployeeListDetailDialogComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(public dialogRef: MatDialogRef<EmployeeListDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public fb: FormBuilder, ) { }

  activeRouteForm = this.fb.group({
    name: ['', Validators.required],
    addressStart: ['', Validators.required],
    addressFinish: ['', Validators.required],
    carName: ['', Validators.required]
  });

  ngOnInit() {
    if(this.data) {
      this.activeRouteForm.patchValue({
        name: this.data.name,
        addressStart: this.data.addressStart,
        addressFinish: this.data.addressFinish,
        carName: this.data.carName
      })
      this.tasks = this.data.tasks;
      this.activeRouteForm.disable();
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
