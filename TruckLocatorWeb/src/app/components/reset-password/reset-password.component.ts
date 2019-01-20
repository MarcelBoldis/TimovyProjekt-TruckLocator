import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private afAuth: AngularFireAuth) { }
  resPassForm = this.fb.group({
    email: ['', Validators.required]
  });

  ngOnInit() {
  }

  resetPassword(): void{
    var that = this;
    this.afAuth.auth.sendPasswordResetEmail(this.resPassForm.get('email').value)
    .then(function(success) {
      that.router.navigateByUrl('/login');
    })
    .catch(function(error) {
      console.log(error.code + "     " + error.message);
    });
  }

}