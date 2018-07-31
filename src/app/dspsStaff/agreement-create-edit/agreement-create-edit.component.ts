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
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-agreement-create-edit',
  templateUrl: './agreement-create-edit.component.html',
  styleUrls: ['./agreement-create-edit.component.css']
})
export class AgreementCreateEditComponent implements OnInit, OnDestroy {

  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  busy: boolean;
  paramSub: Subscription;
  getDataSub: Subscription;
  initialized = false;


  // this stuff will go into the collection formagreements in mongodb
  formName = "formAgreement";

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormsService,
    private authService: AuthService,
    private lastOpStatusService: LastOperationStatusService)
  {
    this.form = fb.group({

      // these are hidden fields. will be filled in ngOnInit

      // agreement for which form?
      agreementForForm: ['', Validators.required],

      // the person creating it. or the last person to edit it
      createdOrEditedById: [''], // User._id


      agreement: ['', Validators.required],
    });

  }

  ngOnInit() {

    this.form.get('createdOrEditedById').setValue(this.authService.getUserId());

    this.busy = true;

    this.paramSub = this.route.params.subscribe(
      params => {
        console.log("params", params);

        this.getDataSub = this.formService.getAgreementRetrievedListener().subscribe(
          agreementData => {

            console.log("back from server, agreementData=", agreementData);

            if (agreementData && agreementData.form) {
              const formData = agreementData.form;

              this.form.get('agreementForForm').setValue(formData.agreementForForm);
              this.form.get('agreement').setValue(formData.agreement);
              // this.form.get('createdOrEditedById').setValue(formData.createdOrEditedByEmail); // previous creator
            }
            this.busy = false;
            this.initialized = true;
          }, err => {
            console.log(err); // there is probably no existing agreement, which is ok
            this.busy = false;
            this.initialized = true;
        });


        const agreementForForm = params['agreementForForm'];

        this.form.get('agreementForForm').setValue(agreementForForm);

        this.title = "User Agreement - " + FormUtil.formTitle(agreementForForm);  // "Intake Form, etc";


        // fetch existing data if it exists
        this.formService.getAgreement(agreementForForm);

      });

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

      // ask formService to save the form. second arg says this is an agreement
      const tmp = this.form.get('agreementForForm').value;
      console.log("agreementForForm=" , tmp);
      this.formService.saveForm(this.savedForm, tmp);


    } // if this.form.dirty
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
    SubscriptionUtil.unsubscribe(this.getDataSub);
    SubscriptionUtil.unsubscribe(this.paramSub);
  }

}
