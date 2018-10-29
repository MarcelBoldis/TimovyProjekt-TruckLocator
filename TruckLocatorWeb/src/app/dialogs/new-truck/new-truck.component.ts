import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-new-truck',
  templateUrl: './new-truck.component.html',
  styleUrls: ['./new-truck.component.scss']
})
export class NewTruckComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewTruckComponent>, public fb: FormBuilder, private af: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data) { }

  trucks: AngularFireList<any[]>;
  newTruckForm = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    carNumber: ['', Validators.required],
    km: ['', Validators.required],
    vin: ['', Validators.required],
    category: ['', Validators.required],
  });

  ngOnInit() {
    this.trucks = this.af.list('/companies/softec/trucks');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  sendData() {
    this.trucks.push(this.newTruckForm.value);
    this.dialogRef.close();
  }
}
