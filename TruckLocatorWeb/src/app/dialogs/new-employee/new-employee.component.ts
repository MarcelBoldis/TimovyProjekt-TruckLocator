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
import { AngularFireAuth } from 'angularfire2/auth';
import { CompanyService } from 'src/app/services/company.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  company: string = '';
  employeeKeys: string[];
  fileName = '';
  title: string;
  showEditInputs: boolean;
  isCreateMode: boolean;
  selectedFile: File = null;
  uploadedImage: File;

  constructor(
    public dialogRef: MatDialogRef<NewEmployeeComponent>,
    public fb: FormBuilder,
    private fbService: FirebaseService,
    private af: AngularFireDatabase,
    @Inject(MAT_DIALOG_DATA) public data,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private afAuth: AngularFireAuth, 
    public companyService: CompanyService) { }

  newEmployeeForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthNumber: ['', Validators.required],
    idNumber: ['', Validators.required],
    birthDate: ['', Validators.required],
    specialisation: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: '',
    photo: ['', Validators.required]
  });

  ngOnInit() {
    this.company = this.companyService.getCompany();
    this.title = 'Pridanie zamestnanca';
    this.showEditInputs = true;
    let employeeWorkersKeys = [];
    let employeeFiredWorkersKeys = [];

    this.newEmployeeForm.get('password').setValue(this.makePassword(10));
    this.newEmployeeForm.get('password').disable();
    this.fbService.getEmployeeListMetadata().subscribe(drivers => {
      employeeWorkersKeys = drivers.map(function (obj: any) {
        return obj.key;
      });
    });
    this.fbService.getEmployeeFiredListMetadata().subscribe(drivers => {
      employeeFiredWorkersKeys = drivers.map(function (obj: any) {
        return obj.key;
      });
      this.employeeKeys = employeeWorkersKeys.concat(employeeFiredWorkersKeys);
      console.log(this.employeeKeys);
    });

    if (this.data) {
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
    } else {
      this.isCreateMode = true;
    }
  }
  makePassword(length: number): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-@#$%^&*()_+!";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
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
      var that = this;
      var userMail = this.newEmployeeForm.get('email').value;
      var userPass = this.newEmployeeForm.get('password').value;
      this.afAuth.auth.createUserWithEmailAndPassword(
        userMail, userPass)
        .then(function (success) {
          console.log("hereeeeeeeeeeeeeeee");
          
          that.dialogRef.close(that.newEmployeeForm.value);

          const name = that.newEmployeeForm.get('firstName').value.toLowerCase();
          const surName = that.newEmployeeForm.get('lastName').value.toLowerCase();

          var found = that.employeeKeys.filter(function (element) {
            return (element.includes(`${name}-${surName}`));
          });

          const specificKey = name + '-' + surName + '-' + found.length;
          this.uploadPhoto(this.uploadedImage, specificKey);
          this.af.object(`${this.company}/Drivers/${specificKey}`).set(this.createNewEmployeeFromForm(this.newEmployeeForm.value, specificKey));
          console.log("============================");
          console.log(specificKey);
          console.log(that.newEmployeeForm.value);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + "       " + errorMessage);
        });


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
        var storageRef = firebase.storage().ref(name);
        storageRef.put(this.selectedFile);
      },
      error => {
        console.log('Image could not be compressed.', error);
      }
    );
  }

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
