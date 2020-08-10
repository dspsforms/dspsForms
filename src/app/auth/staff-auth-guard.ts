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
export class StaffAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    const isStaffAuth = this.authService.getIsStaffAuth();
    if (!isStaffAuth) {
      const nextUrl = route.url.join('/');
      this.router.navigate(['/login'], { queryParams: { next: nextUrl } });
      return false;
    }
    return isStaffAuth;
  }
}
