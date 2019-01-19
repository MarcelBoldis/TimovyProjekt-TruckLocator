import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = '';
  password = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    public afAuth: AngularFireAuth,
    public fbService: FirebaseService) { }



  loginForm = this.fb.group({
    login: this.login,
    password: this.password
  });

  ngOnInit() {

  }

  authLogin(): void {
    var that = this;
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('login').value, this.loginForm.get('password').value).then(function (success) {
      const splittedLogin = success.user.email.split("@");
      const company = splittedLogin[1].substring(0, splittedLogin[1].indexOf(".")).toUpperCase();
      that.fbService.setCompany(company);
      that.router.navigateByUrl('/home');
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + "    " + errorMessage);
      // ...
    });
  }
}
