import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs/operators';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { Subscription } from '../../../../node_modules/rxjs';

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

  next: string;
  querySub: Subscription;


  constructor(private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private authService: AuthService)
  {
    this.signInForm = fb.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: ['', Validators.required]
    });

  }

  ngOnInit() {

    console.log("testing 123");
    this.route.queryParams.subscribe(params => {
      console.log("queryParams in login", params);
    });

    this.querySub =  this.route.queryParams.pipe(filter(params => params.next)).subscribe(params => {
      console.log("next in login:", params.next);
      console.log("and in login, params=:", params);
      this.next =  params.next;
    });

    /*
    this will not work because the route has already changed to /login

    // hold on to the url we came from, so we can redirect to that url
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.prevUrl = event.url;
        console.log('prevUrl=', this.prevUrl);
      }
    });
    */

  }

  login() {

    // redirect to prevUrl (or / if empty) after login
    this.authService.login(this.signInForm.value.email,
      this.signInForm.value.password, this.next);


  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.querySub);

  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
      return this.signInForm.get('password');
  }

}
