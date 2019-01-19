import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';
import { ITruck } from '../../../models/truck';
import { CompanyService } from 'src/app/services/company.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-new-truck',
  templateUrl: './new-truck.component.html',
  styleUrls: ['./new-truck.component.scss']
})
export class NewTruckComponent implements OnInit {
  company: string = '';
  title: string;
  showEditInputs: boolean;
  fileName = '';
  uploadedImage: File;
  selectedFile: File = null;
  photoUploaded = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<NewTruckComponent>,
    public fb: FormBuilder,
    private af: AngularFireDatabase,
    public fbService: FirebaseService,
    public companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public data,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,) { }

  trucks: AngularFireList<ITruck[]>;
  newTruckForm = this.fb.group({
    brand: ['', Validators.required],
    model: ['', Validators.required],
    carNumber: ['', Validators.required],
    km: ['', Validators.required],
    vin: ['', Validators.required],
    state: ['available'],
    category: ['', Validators.required],
    photo: ['', Validators.required]
  });

  ngOnInit() {
    this.company = this.companyService.getCompany();
    this.title = 'Pridanie vozidla';
    this.trucks = this.fbService.getTruckListWritable();
    this.showEditInputs = true;
    if (this.data) {
      if (this.data.edit) {
        this.newTruckForm.controls["photo"].clearValidators();
        this.fillFormControl(this.data.data);
        this.title = 'Editácia vozidla';
      } else {
        this.fillFormControl(this.data.data);
        this.newTruckForm.disable();
        this.title = 'Info o vozidle';
        this.showEditInputs = false;
      }
    }
  }

  setPhoto(event: any) {
    this.uploadedImage = event.target.files[0];
    this.fileName = this.uploadedImage.name;
  }

  uploadPhoto(image: File, name: string) {
    this.ng2ImgMax.compressImage(image, 0.075).subscribe(
      result => {
        this.selectedFile = new File([result], result.name);
        var storageRef = firebase.storage().ref(name);
        storageRef.put(this.selectedFile)
                  .then(() => this.photoUploaded.emit());
      },
      error => {
        console.log('Image could not be compressed.', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  sendData() {
    if (!this.data) {
      const specificKey = this.newTruckForm.get('carNumber').value;
      this.uploadPhoto(this.uploadedImage, specificKey);
      this.af.object(`${this.company}/Trucks/${specificKey}`).set(this.createNewTruckFromForm(this.newTruckForm.value, specificKey));
    } else if (this.data) {
      if (this.uploadedImage) {
        this.uploadPhoto(this.uploadedImage, this.data.clickedIndex);
      }
      this.af.object(`${this.company}/Trucks/${this.data.clickedIndex}`)
        .update(this.createNewTruckFromForm(this.newTruckForm.value, this.data.clickedIndex));
    }
    this.dialogRef.close();
  }

  createNewTruckFromForm(newTruckForm, specificKey): ITruck {
    let truck = {} as ITruck;
    truck.id = specificKey;
    truck.brand = newTruckForm.brand;
    truck.model = newTruckForm.model;
    truck.carNumber = newTruckForm.carNumber;
    truck.km = newTruckForm.km;
    truck.vin = newTruckForm.vin;
    truck.category = newTruckForm.category;
    truck.state = newTruckForm.state;
    truck.photo = specificKey;
    return truck;
  }

  fillFormControl(data: any) {
    this.newTruckForm.patchValue({
      brand: data.brand,
      model: data.model,
      carNumber: data.carNumber,
      km: data.km,
      vin: data.vin,
      category: data.category,
      state: data.state,
      photo: null
    })
  }
}
