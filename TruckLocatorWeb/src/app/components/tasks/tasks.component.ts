import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {MatListModule} from '@angular/material/list';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  taskList = [];
  taskKeyList = [];
  company = '';

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private fbService: FirebaseService, 
              private af: AngularFireDatabase) {
   }

  ngOnInit() {
    this.fbService.getEmployeeListReadable().subscribe(drivers => {
      this.taskList = [];
      drivers.forEach(driver => {
        if (driver.tracks)
          this.formatObjToString(driver.tracks);
      });
    });
    this.company = this.fbService.basePath;
  }

  formatObjToString( tracks: object) {
    return Object.keys(tracks).map(key => {
      this.taskList.push(tracks[key]);   
      this.taskKeyList.push(key); 
    })
  }

  deleteClicked(index: number, driver: string) {
    var key = this.taskKeyList[index];

    console.log(driver);
    console.log(key);
    
    
    this.af.object(`/${this.company}/Drivers/${driver}/tracks/${this.taskKeyList[index]}`).remove();

    this.taskKeyList = this.taskKeyList.filter(function(item) { 
      return item !== key;
  })
    console.log(this.taskKeyList);
    console.log(this.taskList);
  }

  editClicked(index: number) {
    alert(this.taskKeyList[index]);
  }


}
