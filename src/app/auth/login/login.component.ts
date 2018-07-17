import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user;
  errCode: string = null;
  errMsg: string = null;

  displaySignIn = false;
  signInForm;

  constructor(private router: Router,
    public fb: FormBuilder,
  private authService: AuthService)
  {
    this.signInForm = fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  login() {

    // TODO get nextUrl
    this.authService.login(this.signInForm.value.email,
      this.signInForm.value.password, null);


  }

  ngOnDestroy() {

  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
      return this.signInForm.get('password');
  }

}
