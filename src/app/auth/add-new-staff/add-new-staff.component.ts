import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-staff',
  templateUrl: './add-new-staff.component.html',
  styleUrls: ['./add-new-staff.component.css']
})
export class AddNewStaffComponent implements OnInit, OnDestroy {

  user;
  errCode: string = null;
  errMsg: string = null;

  displaySignIn = false;
  signUpForm;

  constructor(private router: Router,
    public fb: FormBuilder)
  {
    this.signUpForm = fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
      password2: ['', [Validators.required, this.passwordsMustMatch] ]
    });

  }

  ngOnInit() {
  }

  addStaffMember() {

  }

  ngOnDestroy() {

  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
      return this.signUpForm.get('password');
  }

  get password2() {
    return this.signUpForm.get('password2');
  }

  passwordsMustMatch() {
    if (this.signUpForm.get('password') === this.signUpForm.get('password2')) {
      return null;
    } else {
      return { passwordMatchError: true };
    }
  }

}
