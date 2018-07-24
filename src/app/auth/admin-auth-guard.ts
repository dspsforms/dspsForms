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
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {


    const isAdminAuth = this.authService.getIsAdminAuth();
    if (!isAdminAuth) {
      const nextUrl = route.url.join('/');
      this.router.navigate(['/login'], {queryParams: {next: nextUrl }} );
    }
    return isAdminAuth;
  }
}
