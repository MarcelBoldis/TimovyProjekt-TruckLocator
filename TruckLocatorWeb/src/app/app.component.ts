import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from './services/firebase.service';

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
              private afAuth: AngularFireAuth,
              public fbService: FirebaseService) {
    db.list('companies').valueChanges().subscribe(items => {
      this.data = items;
    });

    
    var that = this;
    afAuth.auth.onAuthStateChanged(function(user){
      if (user){
        const splittedLogin = user.email.split("@");
        const company = splittedLogin[1].substring(0, splittedLogin[1].indexOf(".")).toUpperCase();
        that.fbService.setCompany(company);
        router.navigateByUrl('/home');
      }else{
        router.navigateByUrl('/login');
      }
    }, function(error){
        console.log(error);
    });
  }
}
