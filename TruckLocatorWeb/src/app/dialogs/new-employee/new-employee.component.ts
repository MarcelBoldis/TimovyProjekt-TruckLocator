import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';
import { IPerson } from '../../../models/person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  selectedFile: File = null;
  allDrivers: any = [];
  counter = 0;
  employeeList: IPerson[];
  title: string;
  showEditInputs: boolean;
  imagePreview: string;

  constructor(public dialogRef: MatDialogRef<NewEmployeeComponent>,
    public fb: FormBuilder,
    private fbService: FirebaseService,
    private af: AngularFireDatabase,
    private http: HttpClient,
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
    state: ''
  });

  ngOnInit() {
    this.title = 'Pridanie zamestnanca';
    this.showEditInputs = true;
    this.fbService.getEmployeeListReadable().subscribe(drivers => {
      this.employeeList = drivers;
      this.employeeList.filter(value => { this.counter++; });
    })

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
    if (this.newEmployeeForm.get('birthDate').touched) {
      this.newEmployeeForm.get('birthDate').setValue(this.newEmployeeForm.get('birthDate').value.toISOString());
    }
    if (!this.data) {
      this.dialogRef.close(this.newEmployeeForm.value);
      const userId = ++this.counter;
      const specificKey = this.newEmployeeForm.get('firstName').value + '-' + this.newEmployeeForm.get('lastName').value + `-${userId}`;
      this.af.object(`${this.company}/Drivers/${specificKey}`).set(this.newEmployeeForm.value);
    } else if (this.data) {
      this.af.object(`${this.company}/Drivers/${this.data.clickedIndex}`)
        .update(this.newEmployeeForm.value);
    }
    this.dialogRef.close();
  }

  uploadPhoto(event: any) {
    let image = event.target.files[0];
    console.log(image);

    this.ng2ImgMax.compressImage(image, 0.075).subscribe(
      result => {
        this.selectedFile = new File([result], result.name);
        console.log(this.selectedFile);
        this.getImagePreview(this.selectedFile);
      },
      error => {
        console.log('Image could not be compressed.', error);
      }
    );
    this.ng2ImgMax.resizeImage(image, 300, 200).subscribe(
      result => {
        this.selectedFile = new File([result], result.name);
        console.log(this.selectedFile);
        var storageRef = firebase.storage().ref(this.selectedFile.name);
        storageRef.put(this.selectedFile);    
      },
      error => {
        console.log('Image could not be resized.', error);
      }
    );  
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
  }

}
