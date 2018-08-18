import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recaptchav3Service } from "./service/recaptchav3.service";


@Injectable({
  providedIn: 'root'
})
export class CaptchaScorer implements CanActivate {
  constructor(private captchaV3Service: Recaptchav3Service, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {


    const nextUrl = route.url.join('/');
    this.captchaV3Service.executeCaptcha(nextUrl);
    return true;
  }
}
