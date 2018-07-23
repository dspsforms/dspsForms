import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { Subscription } from 'rxjs';

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

  initialized = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder, private authService: AuthService)
  {
    this.signUpForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password2: [''],
      isStaff: [true],
      isAdmin: [false], // this.atLeastOneOfAdminOrStaff
    } , {
      validator: [this.passwordsMustMatch, this.atLeastOneOfAdminOrStaff, ]
      });

  }

  ngOnInit() {

    this.initialized = true;

    this.querySub = this.route.queryParams.pipe(filter(params => params.next)).subscribe(params => {
      console.log("next in login:", params.next);
      this.next =  params.next;
    });
  }

  addStaffMember() {
    console.log("signUpForm=", this.signUpForm);

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

  get isStaff() {
    return this.signUpForm.get('isStaff');
  }


  atLeastOneOfAdminOrStaff(group: FormGroup) {
    if (group.get('isAdmin').value || group.get('isStaff').value) {
      return null;
    } else {
      return { atLeastOneOfAdminOrStaff: true };
    }
  }

  passwordsMustMatch(group: FormGroup) {

    const passwordControl = group.get('password');
    const password2Control = group.get('password2');
    if (!passwordControl || !password2Control) {
      return null;
    }
    if (passwordControl.value === password2Control.value) {
      return null;
    } else {
      return { passwordsMustMatch: true };
    }
  }

}
