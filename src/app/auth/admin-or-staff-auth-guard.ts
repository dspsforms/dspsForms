import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminOrStaffAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    // this thing may have issues. need to debug/test. please do not use this for now.
    const isAdminAuth = this.authService.getIsAdminAuth();
    const isStaffAuth = this.authService.getIsStaffAuth();

    const authStatus = isAdminAuth || isStaffAuth;
    if (!authStatus) {
      const nextUrl = route.url.join('/');
      this.router.navigate(['/login'], {queryParams: {next: nextUrl }} );
    }
    return authStatus;
  }
}
