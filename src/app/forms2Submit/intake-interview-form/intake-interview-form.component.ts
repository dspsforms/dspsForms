import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { Autosize } from 'ng-autosize/src/autosize.directive';
// import { AutosizeDirective } from 'angular-autosize';

import { AjaxService } from '../../shared/ajax.service';
// import { AngularFireList } from 'angularfire2/database';
// import { FireDbService } from '../../shared/fire-db.service';

// Do not import from 'firebase' as you'd lose the tree shaking benefits
// import * as firebase from 'firebase/app';

import { SavedForm } from '../../model/saved-form.model';
import { Config } from '../../model/config';
import { StatusMessage } from '../../model/status-message';
import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { UrlConfig } from '../../model/url-config';

@Component({
  selector: 'app-intake-interview-form',
  templateUrl: './intake-interview-form.component.html',
  styleUrls: ['./intake-interview-form.component.css']
})
export class IntakeInterviewFormComponent implements OnInit {

  title;
  intakeForm: FormGroup;

  // intake object initialized to blank
  intakeModel;

  subscription;

  // itemsRef: AngularFireList<any>;
  formName: string = UrlConfig.INTAKE_FORM; // 'intakeForm';

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    // private fireDbService: FireDbService,
    private ajaxService: AjaxService,
    private lastOpStatusService: LastOperationStatusService)
  {

    /*
    TODO add gender

    check if home phone, cell phone, email are required
    */

    // let todaysDate = new Date();
    this.intakeForm = fb.group({
      fullName: ['', Validators.required],
      collegeId: ['', Validators.required],
      addressLine1: [''],
      city: [''],
      zip: [''],

      homePhone: [''],
      cellPhone: [''],
      email: [''],

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
    this.title = "Intake Interview Form";

    // this.itemsRef = this.fireDbService.db.list('formsSubmitted/' + this.formName);


  }

  savedForm;
  newKey;

  createOrEditIntake() {

    if (this.intakeForm.dirty) {

      // var curTime = firebase.database.ServerValue.TIMESTAMP;
      this.savedForm = new SavedForm({
        formName: this.formName,
        user: 'nobody',
        form: this.intakeForm.value,
        edited: false,
        // created and lastMod are added by the server
         // created: curTime,
        // lastMod: curTime,

      });

      console.log("saving form ", this.savedForm);


      // this.newKey = this.itemsRef.push(this.savedForm).key;

      this.ajaxService.post("http://localhost:3000/api/intakeForm", this.savedForm).subscribe(
        res => {
          console.log(res);
          const foo = <{ _id: string, message: string }>res;
          this.newKey = foo._id;

          // set the status message that will be shown in the newForm page
          this.lastOpStatusService.setStatus(StatusMessage.FORM_SUBMIT_SUCCESS);

          // goto /newForm
          this.router.navigate([UrlConfig.NEW_FORM_ABSOLUTE]);

        });





    }



  }
}
