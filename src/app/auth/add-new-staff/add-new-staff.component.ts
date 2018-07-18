import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { Subscription } from '../../../../node_modules/rxjs';

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
  next: string; // url

  querySub: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder, private authService: AuthService)
  {
    this.signUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', [Validators.required]], // , this.passwordsMustMatch
      isStaff: [true],
      isAdmin: [false], // this.atLeastOneOfAdminOrStaff
    });

  }

  ngOnInit() {


    this.querySub = this.route.queryParams.pipe(filter(params => params.next)).subscribe(params => {
      console.log("next in login:", params.next);
      this.next =  params.next;
    });
  }

  addStaffMember() {
    console.log("signUpForm=", this.signUpForm.value);

    this.authService.createUser(this.signUpForm.value.email,
        this.signUpForm.value.name,
        this.signUpForm.value.password,
        this.signUpForm.value.isStaff,
        this.signUpForm.value.isAdmin, this.next);




  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.querySub);

  }

  get email() {
    return this.signUpForm.get('email');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get password() {
      return this.signUpForm.get('password');
  }

  get password2() {
    return this.signUpForm.get('password2');
  }

  get isAdmin() {
    return this.signUpForm.get('isAdmin');
  }

  passwordsMustMatch() {
    if (this.signUpForm.get('password') === this.signUpForm.get('password2')) {
      return null;
    } else {
      return { passwordsMustMatch: true };
    }
  }

  atLeastOneOfAdminOrStaff() {
    if (this.signUpForm.get('isAdmin') || this.signUpForm.get('isStaff')) {
      return null;
    } else {
      return { atLeastOneOfAdminOrStaff: true };
    }
  }

}
