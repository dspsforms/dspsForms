import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { SavedForm } from '../../model/saved-form.model';
import { StatusMessage } from '../../model/status-message';
import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { UrlConfig } from '../../model/url-config';
import { FormName, FormUtil } from '../../model/form.util';
import { Subscription } from 'rxjs';
import { FormsService } from '../../service/forms.service';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormValidators } from '../../service/form-validators';

@Component({
  selector: 'app-emergency-evacuation',
  templateUrl: './emergency-evacuation.component.html',
  styleUrls: ['./emergency-evacuation.component.css']
})
export class EmergencyEvacuationComponent implements OnInit, OnDestroy {


  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;


  formName: string = FormName.EMERGENCY_EVAC_INFO;

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormsService,
    private lastOpStatusService: LastOperationStatusService)
  {


    // let todaysDate = new Date();
    this.form = fb.group({
      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat]],

      homePhone: [''],
      workPhone: [''],
      addressLine1: [''],
      city: [''],
      zip: [''],
      collegeCounselor: [''],


      ambulatory: [''],
      preferredPositioning: [''],

      transportation: fb.group({
        vtaBus: [false],
        outreach: [false],
        taxi: [false],
        other: [''],
      }),

      needEmergencyAssist: [false],
      assistDesc: [''],

      emergencyContact1: fb.group({
        name: [''],
        phone: ['']
      }),

      emergencyContact2: fb.group({
        name: [''],
        phone: ['']
      }),

      // skip mission college emergency video -- it's apparently non existent


      signature: ['', Validators.required],




    });

  }

  ngOnInit() {
    this.title = FormUtil.formTitle(this.formName);
  }



  createOrEditForm() {
    console.log(this.form.value);


    if (this.form.dirty) {

      // this.form.get('collegeId').setValue('G0' + this.form.get('collegeIdTmp').value);
      // console.log("form after colledgeId set", this.form.value);

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


    } // if this.myForm.dirty
  }

  ngOnDestroy() {
    // formSaveStatusSub
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
  }

  // without this, the typescript validators show errors in html
  // some bug in their code

  get collegeId() {
    return this.form.get('collegeId');
  }




}
