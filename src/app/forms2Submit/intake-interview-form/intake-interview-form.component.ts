import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { Autosize } from 'ng-autosize/src/autosize.directive';
// import { AutosizeDirective } from 'angular-autosize';

// import { AngularFireList } from 'angularfire2/database';
// import { FireDbService } from '../../shared/fire-db.service';

// Do not import from 'firebase' as you'd lose the tree shaking benefits
// import * as firebase from 'firebase/app';

import { SavedForm } from '../../model/saved-form.model';
import { Config } from '../../model/config';
import { StatusMessage } from '../../model/status-message';
import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { UrlConfig } from '../../model/url-config';
import { FormName, FormUtil } from '../../model/form.util';
import { Subscription } from 'rxjs';
import { FormsService } from '../../service/forms.service';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormValidators } from '../../service/form-validators';

@Component({
  selector: 'app-intake-interview-form',
  templateUrl: './intake-interview-form.component.html',
  styleUrls: ['./intake-interview-form.component.css']
})
export class IntakeInterviewFormComponent implements OnInit, OnDestroy {

  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  // itemsRef: AngularFireList<any>;
  formName: string = FormName.INTAKE_FORM; // 'intakeForm';

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    // private fireDbService: FireDbService,
    private formService: FormsService,
    private lastOpStatusService: LastOperationStatusService)
  {

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
        eops: [''],
        calWorks: [''],
        ssdi: [''],
        access: [''],
      }),

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

  ngOnInit() {
    this.title = FormUtil.formTitle(this.formName); // "Intake Interview Form";
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

  get email() {
    return this.form.get('email');
  }


}
