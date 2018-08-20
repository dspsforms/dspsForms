import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { FormName } from '../../model/form.util';
import { FormsService } from '../../service/forms.service';
import { FormValidators } from '../../service/form-validators';
import { AbstractFormSubmit } from '../abstract-form-submit';
import { Recaptchav3Service } from '../../service/recaptchav3.service';

@Component({
  selector: 'app-emergency-evacuation',
  templateUrl: './emergency-evacuation.component.html',
  styleUrls: ['./emergency-evacuation.component.css']
})
export class EmergencyEvacuationComponent extends AbstractFormSubmit  implements OnInit, OnDestroy {


  /*
  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;


  formName: string = FormName.EMERGENCY_EVAC_INFO;
  */

  constructor(fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service)
  {
    super(FormName.EMERGENCY_EVAC_INFO, router, route, formService, lastOpStatusService, recaptchaV3Service);

    // form really is a property of super. but super.form doesn't pass the ts compiler. most likely, super.foo has to be a
    // method, not a property
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


  // without the following, typescript validators show errors in html
  // some bug in their code

  get collegeId() {
    return this.form.get('collegeId');
  }




}
