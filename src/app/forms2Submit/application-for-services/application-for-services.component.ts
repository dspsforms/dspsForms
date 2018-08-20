import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { SavedForm } from '../../model/saved-form.model';
import { StatusMessage } from '../../model/status-message';
import { UrlConfig } from '../../model/url-config';
import { FormUtil, FormName } from '../../model/form.util';
import { Subscription } from '../../../../node_modules/rxjs';
import { FormsService } from '../../service/forms.service';
import { FormValidators } from '../../service/form-validators';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { Recaptchav3Service } from '../../service/recaptchav3.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-application-for-services',
  templateUrl: './application-for-services.component.html',
  styleUrls: ['./application-for-services.component.css']
})
export class ApplicationForServicesComponent implements OnInit, OnDestroy {

  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.APPLICATION_FOR_SERVICES; // 'applicationForServices';

  captchaError = false;
  captchaTokenSub: Subscription;
  sequenceNumber: number;

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormsService,
    private lastOpStatusService: LastOperationStatusService,
    private recaptchaV3Service: Recaptchav3Service)
  {
    this.form = fb.group({
      initialDate: ['', Validators.required],
      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat]] ,
      phone: ['', Validators.required],
      studentSignature: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.title = FormUtil.formTitle(this.formName);  // "DSPS Application for Services";
    this.sequenceNumber = 0;


    // this.itemsRef = this.fireDbService.db.list('formsSubmitted/' + this.formName);
  }



  createOrEditForm() {
    console.log("createOrEditForm", this.form.value);


    if (this.form.dirty) {

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

  get collegeId() {
    return this.form.get('collegeId');
  }



  // this is for reCaptcha v2
  // resolved(captcha) {
  //   console.log("From recaptcha: captcha=", captcha);
  //   if (captcha) {
  //     this.captchaError = false;
  //     this.createOrEditForm(captcha);
  //   } else {
  //     this.captchaError = true;
  //   }

  // }

}
