import { Component , Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ActiveLinkSRComponent } from './active-link-sr.component';
import { AuthService } from './auth/auth.service';
import { Subscription } from '../../node_modules/rxjs';
import { SubscriptionUtil } from './shared/subscription-util';
import { AuthType } from './auth/auth-type.model';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'nav-bar',
    templateUrl: "./nav-bar.component.html" ,
    styleUrls: ['./nav-bar.component.css']

})
export class NavBarComponent implements OnInit, OnDestroy {

    // @Input() activeClass: string;

  active = '';

  auth: AuthType;

  authChange: Subscription;
  school;

  constructor(private _router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    // school
    this.school = environment.school || null;

    // initialize with current auth
    this.auth = this.authService.getAuth();

    // listen to changes
    this.authChange = this.authService.getAuthStatusListener().subscribe(auth => {
       this.auth = auth;
    });

  }

  get loggedIn() {
    return this.auth.adminAuth || this.auth.staffAuth;
  }

  get staffAuth() {
    return this.auth.staffAuth;
  }

  get adminAuth() {
    return this.auth.adminAuth;
  }


  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.authChange);

  }

  isCurrentlyActive(path) {
        // params: (path, isExact)
        try {
            // console.log("path=", path);
            if (this._router.isActive(path, true)) {
                return true;
            } else {
              return false;
            }

        } catch (err) {
            console.log("isCurrentlyActive, path=", path, err);
            return false;
        }

  }

  stopPropagation($event) {
        event.stopPropagation();
  }

  login() {
    /*
    login
    go back to page where we came from
    */

    const nextUrl = this.route.snapshot['_routerState'].url;
    console.log("nextUrl", nextUrl);
    this._router.navigate(['/login'], { queryParams: { next: nextUrl } });


  }

  logout() {
    this.authService.logout();
  }

  // get loggedInDeprecated() {
  //   if (this.authService.getIsAdminAuthDeprecated() ||
  //     this.authService.getIsStaffAuthDeprecated()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // get staffAuthDeprecated() {
  //   if (this.authService.getIsStaffAuthDeprecated()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // get adminAuthDeprecated() {
  //   if (this.authService.getIsAdminAuthDeprecated()) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }



}
