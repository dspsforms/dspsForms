

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { Autosize } from 'ng-autosize/src/autosize.directive';
// import { AutosizeDirective } from 'angular-autosize';



import * as _ from 'underscore';

import { SavedForm } from '../../model/saved-form.model';
import { Config } from '../../model/config';
import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { StatusMessage } from '../../model/status-message';
import { UrlConfig } from '../../model/url-config';
import { FormUtil, FormName } from '../../model/form.util';
import { FormsService } from '../../service/forms.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormValidators } from '../../service/form-validators';

@Component({
  selector: 'app-alt-media-service-request',
  templateUrl: './alt-media-service-request.component.html',
  styleUrls: ['./alt-media-service-request.component.css']
})
export class AltMediaServiceRequestComponent implements OnInit, OnDestroy {

  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.ALT_MEDIA_REQUEST; // 'altMediaRequest';

  // not used
  altbooks: any[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormsService,
    private lastOpStatusService: LastOperationStatusService, ) {



    // myForm is a FormGroup which contains an empty FormArray
    this.form = this.fb.group({
      altFormatDetail: this.fb.array([]),

      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat] ],
      email: ['', [Validators.required, Validators.email]],
      cellPhone: ['', Validators.required],

      // Choose a specific file format from the list below.
      // You may choose first and second choice.
      preferredFileFormat: fb.group({
        kurzWeilFirefly: [''],
        msWord: [''],
        pdf: [''],
        learningAlly: [''],
        audio: [''],
        braillePaper: [''],
        largePrint: [''],
      }),

      signature: ['', Validators.required],

      // no date field in original form.
      // date created will be entered automatically



    });

  }

  addRow() {

      // This function instantiates a FormGroup for each alt format request
      // and pushes it into the FormArray

      // We get our FormArray
      const control = <FormArray>this.form.controls['altFormatDetail'];

      // instantiate a new alt-format-request FormGroup;
      const newAltFormatReq: FormGroup = this.initItems();

      // Add it to our formArray
      control.push(newAltFormatReq);
  }

  initItems(): FormGroup {
    // Here, we make the form for each alt media request

    return this.fb.group({
              courseTitleAndSection: ['', Validators.required],
              isbn: [''],
              bookTitleAndAuthor: ['', Validators.required],
              edition: ['']
           });
  }


  ngOnInit() {
    this.title = FormUtil.formTitle(this.formName); // "Alternate Format Request Form";


    // add one row. if more rows are added, form validation will need all rows to be valid

    this.addRow();

    // initialize firebase root
    // this.itemsRef = this.fireDbService.db.list('formsSubmitted/' + this.formName);



  }


  delete(i) {

    console.log("delete: i=", i);

    // console.log("myForm=", this.myForm);


    const control = <FormArray>this.form.controls['altFormatDetail'];

    console.log("control, before delete=", control);

    // https://stackoverflow.com/questions/43520010/angular-4-form-formarray-add-a-button-to-add-or-delete-a-form-input-row/43521492
    control.removeAt(i);

    // control.controls.splice(i, 1);

    console.log("control, after delete=", control);

    // controlArr.delete(i);
    // _.without(control.controls, i);

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


    } // if this.myForm.dirty
  }



  showForm() {
    console.log(this.form);
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.formSaveStatusSub);
  }

  get formAltFormatDetail() { return <FormArray>this.form.get('altFormatDetail'); }

  get email() {
    return this.form.get('email');
  }


  get collegeId() {
    return this.form.get('collegeId');
  }


}

