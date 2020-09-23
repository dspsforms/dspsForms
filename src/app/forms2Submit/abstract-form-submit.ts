import { FormGroup } from "@angular/forms";
import { SavedForm } from "../model/saved-form.model";
import { Subscription } from "rxjs";
import { FormUtil } from "../model/form.util";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsService } from "../service/forms.service";
import { LastOperationStatusService } from "../service/last-operation-status.service";
import { Recaptchav3Service } from "../service/recaptchav3.service";
import { OnInit, OnDestroy } from "@angular/core";
import { SubscriptionUtil } from "../shared/subscription-util";
import { StatusMessage } from "../model/status-message";
import { UrlConfig } from "../model/url-config";
import { environment } from "../../environments/environment";

// base class for form submits

export class AbstractFormSubmit implements OnInit, OnDestroy {

  public title: string;
  public form: FormGroup;

  public savedForm: SavedForm;
  public err: string;
  public errMsg: string;
  public formSaveStatusSub: Subscription;


  public captchaError = false;
  public captchaTokenSub: Subscription;
  public sequenceNumber: number;

  // prevent multiple form submits
  // in the template disable submit button when formSubitted is true
  public formSubmitted: boolean;

  constructor(
    public formName: string,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service)
  {

  }

  ngOnInit() {

    this.title = FormUtil.formTitle(this.formName);  // "DSPS Application for Services" etc;
    this.sequenceNumber = 0;
    this.formSubmitted = false;

  }

  createOrEditForm() {

    console.log("createOrEditForm ", this.formName, "  ",  this.form.value);


    if (this.form.dirty) {

      // disable submit button so no more submits
      this.formSubmitted = true;

      // compute the reCaptcha v3 token once more, then use it
      this.sequenceNumber++;
      this.recaptchaV3Service.executeCaptcha(this.formName, this.sequenceNumber);

      this.captchaTokenSub = this.recaptchaV3Service.getTokenListener().subscribe(tokenData => {

        console.log(tokenData);
        // check if this is for us. if it's not, return
        if (tokenData.page === this.formName
          && tokenData.sequenceNumber === this.sequenceNumber
          && this.form.dirty
        ) {

          this.savedForm = new SavedForm({
            formName: this.formName,
            user: 'nobody',
            form: this.form.value,
            edited: false,
            reCaptchaV3Token: tokenData.token
            // created: curTime,
            // lastMod: curTime,

          });

          // first subscribe to the form save status listener. then, ask formService to save the form
          this.formSaveStatusSub = this.formService.getFormSaveStatusListener().subscribe(res => {
            if (res.err) {
              // form save failed, show error message, stay on current page
              this.err = res.err;
              this.errMsg = res.message;
            } else {

              // form saved successfully, redirect out

              // set the status message that will be shown in the newForm page
              this.lastOpStatusService.setStatus(StatusMessage.FORM_SUBMIT_SUCCESS);

              // goto /newForm
              this.router.navigate([UrlConfig.NEW_FORM_ABSOLUTE]);
            }
          });

          // ask formService to save the form
          this.formService.saveForm(this.savedForm);

        }  else {
          // this subscription data is not for us
          if (environment.debug.RECAPTCHA_V3) {
            console.log("token not for us, or form is not dirty. skipping form save");
          }
        }
      }); // recaptcha v3 token subscription

    } // if this.form.dirty
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.captchaTokenSub);
  }

}
