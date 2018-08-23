import { Component , Input, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ActiveLinkSRComponent } from './active-link-sr.component';
import { AuthService } from './auth/auth.service';
import { Subscription } from '../../node_modules/rxjs';
import { SubscriptionUtil } from './shared/subscription-util';

@Component({
    selector: 'nav-bar',
    templateUrl: "./nav-bar.component.html" ,
    styles: [`
        .own-logo {
            height : 200px;
        }
    `]

})
export class NavBarComponent implements OnInit, OnDestroy {

    // @Input() activeClass: string;

  active = '';

 // auth: AuthType;

  authChange: Subscription;

  constructor(private _router: Router,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // initialize with current auth
    // this.auth = this.authService.getAuth();

    // listen to changes
    // this.authChange = this.authService.getAuthStatusListener().subscribe(auth => {
    //   this.auth = auth;
    // });

  }

  get loggedIn() {
    if (this.authService.getIsAdminAuth() || this.authService.getIsStaffAuth()) {
      return true;
    } else {
      return false;
    }
  }

  get staffAuth() {
    if (this.authService.getIsStaffAuth()) {
      return true;
    } else {
      return false;
    }
  }

  get adminAuth() {
    if (this.authService.getIsAdminAuth()) {
      return true;
    } else {
      return false;
    }
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


}
