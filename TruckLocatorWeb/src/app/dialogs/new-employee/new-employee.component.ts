import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';
import { IPerson } from '../../../models/person';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from 'angularfire2/auth';
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
  selectedFile: File = null;
  uploadedImage: File;
  photoUploaded = new EventEmitter();
  addEmployee: boolean;

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
    private snackBar: MatSnackBar,
    ) { }

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
    this.company = this.fbService.getCompany();
    this.title = 'Pridanie zamestnanca';
    this.showEditInputs = true;
    let employeeWorkersKeys = [];
    let employeeFiredWorkersKeys = [];
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
    });

    if (this.data) {
      if (this.data.edit) {
        this.addEmployee = false;
        this.newEmployeeForm.controls["photo"].clearValidators();
        this.fillFormControl(this.data.data);
        this.title = 'Editácia zamestnanca';
      } else {
        this.fillFormControl(this.data.data);
        this.newEmployeeForm.disable();
        this.title = 'Info o zamestnancovi';
        this.showEditInputs = false;
      }
    }else{
      this.addEmployee = true;
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
      var userPass = this.makePassword(10);
      this.afAuth.auth.createUserWithEmailAndPassword(
        userMail, userPass)
        .then(function (success) {
          
          that.dialogRef.close(that.newEmployeeForm.value);

          const name = that.newEmployeeForm.get('firstName').value.toLowerCase();
          const surName = that.newEmployeeForm.get('lastName').value.toLowerCase();

          var found = that.employeeKeys.filter(function (element) {
            return (element.includes(`${name}-${surName}`));
          });

          const specificKey = name + '-' + surName + '-' + found.length;
          that.uploadPhoto(that.uploadedImage, specificKey);
          that.af.object(`${that.company}/Drivers/${specificKey}`).set(that.createNewEmployeeFromForm(that.newEmployeeForm.value, specificKey));
          that.afAuth.auth.sendPasswordResetEmail(userMail)
          .then(function(success) {
            that.snackBar.open('Uspešne odoslaný e-mail', 'Ok', {
              duration: 2000,
            });
          })
          .catch(function(error) {
            that.snackBar.open(error.message, 'Ok', {
              duration: 2000,
            });
          });
        })
        .catch(function (error) {
          that.snackBar.open(error.message, 'Ok', {
            duration: 2000,
          });
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
    return person;
  }

  setPhoto(event: any) {
    this.uploadedImage = event.target.files[0];
    this.fileName = this.uploadedImage.name;
  }

  uploadPhoto(image: File, name: string) {
    var that = this;
    this.ng2ImgMax.compressImage(image, 0.075).subscribe(
      result => {
        this.selectedFile = new File([result], result.name);
        var storageRef = firebase.storage().ref(name);
        storageRef.put(this.selectedFile)
                  .then(() => this.photoUploaded.emit());
      },
      error => {
        that.snackBar.open(error, 'Ok', {
          duration: 2000,
        });
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
