import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SessionStorageService } from 'angular-web-storage'
import { SessionCryptoService } from 'src/app/services/session-crypto.service';
import {MatSnackBar} from '@angular/material';


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
    public fbService: FirebaseService,
    private session: SessionStorageService,
    private cryptoservice: SessionCryptoService,
    private snackBar: MatSnackBar) { }

  loginForm = this.fb.group({
    login: this.login,
    password: this.password
  });

  ngOnInit() { }

  authLogin(): void {
    var that = this;
    var isCompanyUser = this.isCompanyLoged(this.loginForm.get('login').value);
    if(isCompanyUser){
      var that = this;
      this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.get('login').value, this.loginForm.get('password').value).then(function (success) {
        const company = that.getCompanyFromEmail(success.user.email); 
        that.setSessionCompanyName(company);
        that.setSessionCompanyMail(that.loginForm.get('login').value);
        that.fbService.setCompany(company);
        that.router.navigateByUrl('/home');
      }).catch(function (error) {
        var errorMessage = error.message;
        that.snackBar.open(errorMessage, 'OK', {
          duration: 2000,
        });
      });
    }
  }

  getCompanyFromEmail(userEmail: string): string {
    const splittedLogin = userEmail.split('@');
    return splittedLogin[1].substring(0, splittedLogin[1].indexOf(".")).toUpperCase();
  }

  setSessionCompanyName(company: string) {
    this.session.set('companyNameTruckLocator', this.cryptoservice.encriptPlainText(company, 'kajovKlucNaSeesionPreTruckLocator'));
  }

  setSessionCompanyMail(userEmail: string) {
    const mail = userEmail.split('@')[1];
    console.log(mail);
    this.session.set('companyMail', this.cryptoservice.encriptPlainText(mail, 'kajovKlucNaSeesionPreTruckLocator'));
  }

  removeSessionCompanyName() {
    this.session.remove('companyNameTruckLocator');
  }
  isCompanyLoged(email: string){
    const splittedLogin = email.split('@');
    const company = splittedLogin[1].substring(0, splittedLogin[1].indexOf("."));
    return splittedLogin[0].includes(company);
  }

}
