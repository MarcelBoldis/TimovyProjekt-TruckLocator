import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = 'admin';
  password = 'admin';

  constructor(private fb: FormBuilder,
              private router: Router) { }

  loginForm = this.fb.group({
    login: [''],
    password: ['']
  });


  ngOnInit() {
  }

  checkInputs(): void {
    if ((this.loginForm.get('login').value === this.login) && (this.loginForm.get('password').value === this.password)) {
      this.router.navigateByUrl('/home');
    }
  }

}
