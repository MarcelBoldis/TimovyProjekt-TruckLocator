import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireList } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';
import { ITruck } from '../../../models/truck';

@Component({
  selector: 'app-new-truck',
  templateUrl: './new-truck.component.html',
  styleUrls: ['./new-truck.component.scss']
})
export class NewTruckComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewTruckComponent>, 
    public fb: FormBuilder, 
    public fbService: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  trucks: AngularFireList<ITruck[]>;
  newTruckForm = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    carNumber: ['', Validators.required],
    km: ['', Validators.required],
    vin: ['', Validators.required],
    category: ['', Validators.required],
  });

  ngOnInit() {
    this.trucks = this.fbService.getTruckListWritable();
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
