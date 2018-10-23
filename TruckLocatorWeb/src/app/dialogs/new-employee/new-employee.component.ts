import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewEmployeeComponent>,
              public fb: FormBuilder,
              private af: AngularFireDatabase,
              @Inject(MAT_DIALOG_DATA) public data) { }
    employee: AngularFireList<any[]>;
    newEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthNumber: ['', Validators.required],
      idNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      specialisation: ['', Validators.required],
      address: ['', Validators.required],
    });

  ngOnInit() {
    this.employee = this.af.list('/companies/softec');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  sendEmployee() {
    this.dialogRef.close(this.newEmployeeForm.value);
    this.employee.push(this.newEmployeeForm.value);
  }
}
