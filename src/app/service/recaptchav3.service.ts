import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { Subscription, Subject } from 'rxjs';
import { ErrorService } from '../error/error.service';

declare var jquery: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class Recaptchav3Service {

  CAPTCHA_KEY = environment.reCaptchaV3ClientKey;

  grecaptcha;

  token: string;
  tokenSub: Subject<{ token: string, page: string, sequenceNumber: number }>
    = new Subject<{ token: string, page: string, sequenceNumber: number }>();

  constructor()  {
    this.grecaptcha = (<any>window).grecaptcha;

    console.log("window.grecaptcha ", this.grecaptcha);
  }

  // if sequence number is > 0, only then txmit on observable
  public executeCaptcha(page: string, sequenceNumber?: number) {
    if (this.grecaptcha) {
      this.grecaptcha.ready(() => {
        $("div.grecaptcha-badge").attr("aria-hidden", true);
        $("div.grecaptcha-badge").attr("role", "presentation");
        this.grecaptcha
          .execute(this.CAPTCHA_KEY, {
            action: page
          })
          .then((token: string) => {
            try {
              $("div.grecaptcha-badge").attr("aria-hidden", true);
              $("div.grecaptcha-badge").attr("role", "presentation");
            } catch (err) {
              console.log("jq-aria errror", err);
            }

            this.token = token;

            if (environment.debug.RECAPTCHA_V3) {
              console.log("executeCaptcha(): action=", page,
                " sequenceNumber= ", sequenceNumber,
                " token=", token);
            }

            // let the specific listener know
            // while we are broadcasting, the listener will use the page and sequenceNumber
            // filters to decide if it's for them
            if (sequenceNumber && sequenceNumber > 0) {
              this.tokenSub.next({
                token: this.token,
                page: page,
                sequenceNumber: sequenceNumber
              });
            }

          }
        );
      });
    } else {
      console.log("this.grecaptcha is not defined");
    }

  }

  getTokenListener() {
    return this.tokenSub.asObservable();
  }
}
