import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logOut(): void{
    var that = this;
    this.afAuth.auth.signOut().then(success => {
      that.router.navigateByUrl('/login');
    });
  }
}
