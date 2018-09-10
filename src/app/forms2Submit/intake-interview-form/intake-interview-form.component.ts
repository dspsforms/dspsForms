import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { FormName, FormUtil } from '../../model/form.util';

import { FormsService } from '../../service/forms.service';
import { FormValidators } from '../../service/form-validators';
import { Recaptchav3Service } from '../../service/recaptchav3.service';
import { AbstractFormSubmit } from '../abstract-form-submit';

@Component({
  selector: 'app-intake-interview-form',
  templateUrl: './intake-interview-form.component.html',
  styleUrls: ['./intake-interview-form.component.css']
})
export class IntakeInterviewFormComponent  extends AbstractFormSubmit implements OnInit, OnDestroy {

  /*
  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.INTAKE_FORM; // 'intakeForm';
  */

  constructor(fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service)
  {
    super(FormName.INTAKE_FORM, router, route, formService, lastOpStatusService, recaptchaV3Service);

    /*
    TODO add gender

    check if home phone, cell phone, email are required
    */

    // let todaysDate = new Date();
    this.form = fb.group({
      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat]],
      // collegeId: [''],
      addressLine1: [''],
      city: [''],
      zip: [''],

      homePhone: [''],
      cellPhone: [''],
      email: ['', Validators.email],

      dob: [''],
      gender: [''],

      occupation: [''],
      occupationHowLong: [''],
      homeLang: [''],

      emergencyContact: fb.group( {
        name: [''],
        relationship: [''],
        homePhone: [''],
        workPhone: [''],
        cellPhone: [''] ,
        // email?
      }),

      hasDiploma: [''],
      highSchool: [''],

      numSemsAtMission: [''],
      plannedMajor: [''],

      hasCounselor: [''],
      counselorName: [''],

      referrer: [''],
      referrerReason: [''],

      isDeptRehabClient: [''],
      rehabCounselorName: [''],

      services: fb.group({
        eops: [false],
        calWorks: [false],
        ssdi: [false],
        access: [false],
      }),


      // foo: [''],
      // bar: [''],

      wantSevicesInfo: [''],

      enrolledInAnotherCC: [''],
      receivingFinAid: [''],

      hasDisability: [''],
      disabilityDesc: [''],

      medSideEffects: [''],
      accommodationDesc: [''],

      signature: ['', Validators.required],
      dateOfSig: [''],

      // TODO
      // dateOfSig:[todaysDate, Validators.required],




    });

  }


  // without this, the typescript validators show errors in html
  // some bug in their code

  get collegeId() {
    return this.form.get('collegeId');
  }

  get email() {
    return this.form.get('email');
  }


}
