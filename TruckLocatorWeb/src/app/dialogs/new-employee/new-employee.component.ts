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

  title: string;
  showEditInputs: boolean;
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
    this.title = 'Pridanie zamestnanca';
    this.showEditInputs = true;
    this.employee = this.af.list('/UPC/Drivers');

    if (this.data) {
      if (this.data.edit) {
        this.newEmployeeForm.setValue(this.data.data);
        this.title = 'Editácia zamestnanca';
      } else {
        this.newEmployeeForm.setValue(this.data.data);
        this.newEmployeeForm.disable();
        this.title = 'Info o zamestnancovi';
        this.showEditInputs = false;
      }

    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  sendEmployee() {
      if (!this.data) {
      const timestamp =  this.newEmployeeForm.get('birthDate').value._i.year + '-' +
        + this.newEmployeeForm.get('birthDate').value._i.month + '-' +
        + this.newEmployeeForm.get('birthDate').value._i.date + 'T00:00:00.000Z';
      this.newEmployeeForm.get('birthDate').setValue(timestamp);
      this.dialogRef.close(this.newEmployeeForm.value);
      console.log('--------------------');
      console.log(this.newEmployeeForm.value);
      this.employee.push(this.newEmployeeForm.value);
    } else if (this.data) {

      this.af.object('/UPC/Drivers/' + this.data.clickedIndex)
      .update(this.newEmployeeForm.value);
    }
    this.dialogRef.close();

  }



}
