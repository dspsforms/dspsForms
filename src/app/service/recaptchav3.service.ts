import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Recaptchav3Service {


  token;
  CAPTCHA_KEY = '6LfzjGoUAAAAAI3AQKhMdItGds9RbSKlK5gEqrex';

  grecaptcha;
  constructor()  {
    this.grecaptcha = (<any>window).grecaptcha;

    console.log("window.grecaptcha ", this.grecaptcha);
  }

  public executeCaptcha(page) {
    if (this.grecaptcha) {
      this.grecaptcha.ready(() => {
        this.grecaptcha
          .execute(this.CAPTCHA_KEY, {
            action: page
          })
          .then((token: string) => {
            this.token = token;
            console.log("executeCaptcha(): action=", page, " token=", token);
          }
        );
      });
    } else {
      console.log("this.grecaptcha is not defined");
    }

  }
}
