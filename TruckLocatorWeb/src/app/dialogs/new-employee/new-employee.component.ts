import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';
import { IPerson } from '../../../models/person';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import 'firebase/storage';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  company = 'UPC';
  counter = 0;
  fileName = '';
  employeeList: IPerson[];
  title: string;
  showEditInputs: boolean;
  imagePreview: string;
  selectedFile: File = null;
  uploadedImage: File;

  constructor(public dialogRef: MatDialogRef<NewEmployeeComponent>,
    public fb: FormBuilder,
    private fbService: FirebaseService,
    private af: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer) { }

  newEmployeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthNumber: ['', Validators.required],
    idNumber: ['', Validators.required],
    birthDate: ['', Validators.required],
    specialisation: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    photo: ['', Validators.required]
  });

  ngOnInit() {
    this.title = 'Pridanie zamestnanca';
    this.showEditInputs = true;
    this.fbService.getEmployeeListReadable().subscribe(drivers => {
      this.employeeList = drivers;
      this.employeeList.filter(value => { this.counter++; });
    })

    if (this.data) {
      console.log(this.data.data);
      console.log(this.newEmployeeForm.value);

      if (this.data.edit) {
        this.newEmployeeForm.controls["photo"].clearValidators();
        this.fillFormControl(this.data.data);
        this.title = 'Editácia zamestnanca';
      } else {
        this.fillFormControl(this.data.data);
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
    if (this.newEmployeeForm.get('birthDate').touched) {
      this.newEmployeeForm.get('birthDate').setValue(this.newEmployeeForm.get('birthDate').value.toISOString());
    }
    if (!this.data) {
      this.dialogRef.close(this.newEmployeeForm.value);
      const userId = ++this.counter;
      const specificKey = this.newEmployeeForm.get('firstName').value.toLowerCase() + '-' + this.newEmployeeForm.get('lastName').value.toLowerCase() + `-${userId}`;
      this.uploadPhoto(this.uploadedImage, specificKey);
      this.af.object(`${this.company}/Drivers/${specificKey}`).set(this.createNewEmployeeFromForm(this.newEmployeeForm.value, specificKey));
    } else if (this.data) {
      if (this.uploadedImage) {
        this.uploadPhoto(this.uploadedImage, this.data.clickedIndex);
      }
      this.af.object(`${this.company}/Drivers/${this.data.clickedIndex}`)
        .update(this.createNewEmployeeFromForm(this.newEmployeeForm.value, this.data.clickedIndex));
    }
    this.dialogRef.close();
  }

  createNewEmployeeFromForm(newEmployeeForm, specificKey): IPerson {
    let person = {} as IPerson;
    person.id = specificKey;
    person.address = newEmployeeForm.address;
    person.birthDate = newEmployeeForm.birthDate;
    person.birthNumber = newEmployeeForm.birthNumber;
    person.firstName = newEmployeeForm.firstName;
    person.lastName = newEmployeeForm.lastName;
    person.idNumber = newEmployeeForm.idNumber;
    person.specialisation = newEmployeeForm.specialisation;
    person.email = newEmployeeForm.email;
    person.photo = specificKey;
    console.log(person);
    return person;
  }

  setPhoto(event: any) {
    this.uploadedImage = event.target.files[0];
    this.fileName = this.uploadedImage.name;
    console.log(this.uploadedImage.name);
  }

  uploadPhoto(image: File, name: string) {
    this.ng2ImgMax.compressImage(image, 0.075).subscribe(
      result => {
        this.selectedFile = new File([result], result.name);
        console.log(this.selectedFile);
        //this.getImagePreview(this.selectedFile);
        var storageRef = firebase.storage().ref(name);
            storageRef.put(this.selectedFile);
        // this.ng2ImgMax.resizeImage(image, 100, 100).subscribe(
        //   result => {
        //     this.selectedFile = new File([result], result.name);
        //     console.log(this.selectedFile);
        //     var storageRef = firebase.storage().ref(name);
        //     storageRef.put(this.selectedFile);
        //   },
        //   error => {
        //     console.log('Image could not be resized.', error);
        //   }
        // );
      },
      error => {
        console.log('Image could not be compressed.', error);
      }
    );

  }

  // getImagePreview(file: File) {
  //   const reader: FileReader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imagePreview = reader.result.toString();
  //   };
  // }

  fillFormControl(data: any) {
    this.newEmployeeForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      birthNumber: data.birthDate,
      idNumber: data.idNumber,
      birthDate: data.birthDate,
      specialisation: data.specialisation,
      address: data.address,
      email: data.email,
      photo: null
    })
  }

}
