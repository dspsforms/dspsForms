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

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit , OnDestroy {

  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.FEEDBACK; // 'feedback';

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormsService,
    private lastOpStatusService: LastOperationStatusService)
  {
    this.form = fb.group({
      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat]] ,
      phone: [''],
      email: ['', Validators.email],
      feedbackMessage: ['', Validators.required],
      studentSignature: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.title = FormUtil.formTitle(this.formName);  // "DSPS Application for Services";

    // this.itemsRef = this.fireDbService.db.list('formsSubmitted/' + this.formName);
  }



  createOrEditForm() {
    console.log(this.form.value);


    if (this.form.dirty) {

      this.savedForm = new SavedForm({
        formName: this.formName,
        user: 'nobody',
        form: this.form.value,
        edited: false,
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
          this.router.navigate([UrlConfig.NEW_FORM_ABSOLUTE ]);
        }
      });

      // ask formService to save the form
      this.formService.saveForm(this.savedForm);


    } // if this.form.dirty
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
  }

  get collegeId() {
    return this.form.get('collegeId');
  }

  get email() {
    return this.form.get('email');
  }

}
