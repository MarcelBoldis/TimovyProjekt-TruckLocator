import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';
import { ITruck } from '../../../models/truck';

@Component({
  selector: 'app-new-truck',
  templateUrl: './new-truck.component.html',
  styleUrls: ['./new-truck.component.scss']
})
export class NewTruckComponent implements OnInit {
  company = 'UPC';
  title: string;
  showEditInputs: boolean;
  constructor(
    public dialogRef: MatDialogRef<NewTruckComponent>,
    public fb: FormBuilder,
    private af: AngularFireDatabase,
    public fbService: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  trucks: AngularFireList<ITruck[]>;
  newTruckForm = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    carNumber: ['', Validators.required],
    km: ['', Validators.required],
    vin: ['', Validators.required],
    state: ['available'],
    category: ['', Validators.required],
  });

  ngOnInit() {
    this.title = 'Pridanie vozidla';
    this.trucks = this.fbService.getTruckListWritable();
    if (this.data) {
      if (this.data.edit) {
        this.newTruckForm.setValue(this.data.data);
        this.title = 'Editácia vozidla';
      } else {
        this.newTruckForm.setValue(this.data.data);
        this.newTruckForm.disable();
        this.title = 'Info o vozidle';
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

  sendData() {
    if (!this.data) {
      const specificKey = this.newTruckForm.get('carNumber').value;
      this.af.object(`${this.company}/Trucks/${specificKey}`).set(this.newTruckForm.value);
    } else if (this.data) {
      this.af.object(`${this.company}/Trucks/${this.data.clickedIndex}`)
        .update(this.newTruckForm.value);
    }
    this.dialogRef.close();
  }
}
