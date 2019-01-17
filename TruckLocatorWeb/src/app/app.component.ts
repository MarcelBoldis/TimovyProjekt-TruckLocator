import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // FIREBASE
  data = [];
  constructor(db: AngularFireDatabase,
              private router: Router,
              private afAuth: AngularFireAuth) {
    db.list('companies').valueChanges().subscribe(items => {
      this.data = items;
    });

    afAuth.auth.onAuthStateChanged(function(user){
      if (user){
        router.navigateByUrl('/home');
      }else{
        router.navigateByUrl('/login');
      }
    }, function(error){
        console.log(error);
    });
  }
}
