import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
    if (!afAuth.auth.currentUser) {
      router.navigateByUrl('/login');
    }
   }

  ngOnInit() {
  }

}
