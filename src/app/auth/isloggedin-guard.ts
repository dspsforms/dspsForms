import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot,  Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    // is loggged in?
    // if so, will have userId
    const userId = this.authService.getUserId();
    if (!userId) {
      const nextUrl = route.url.join('/');
      this.router.navigate(['/login'], { queryParams: { next: nextUrl } });
      return false;
    }  {
        return true;
    }
  }
}
