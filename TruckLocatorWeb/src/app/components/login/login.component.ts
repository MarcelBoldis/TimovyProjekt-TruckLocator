import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


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
              public afAuth: AngularFireAuth) { }



  loginForm = this.fb.group({
    login: this.login,
    password: this.password
  });

  ngOnInit() {
    
  }
  
  authLogin(): void{
    var that=this;
    this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('login').value, this.loginForm.get('password').value).then(function (success){
      that.router.navigateByUrl('/home');
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + "    " + errorMessage);
      // ...
    });
  }
}
