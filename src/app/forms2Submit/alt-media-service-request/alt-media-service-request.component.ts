

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { Autosize } from 'ng-autosize/src/autosize.directive';
// import { AutosizeDirective } from 'angular-autosize';

import { AjaxService } from '../../shared/ajax.service';


import * as _ from 'underscore';

import { SavedForm } from '../../model/saved-form.model';
import { Config } from '../../model/config';
import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { StatusMessage } from '../../model/status-message';
import { UrlConfig } from '../../model/url-config';
import { FormUtil, FormName } from '../../model/form.util';

@Component({
  selector: 'app-alt-media-service-request',
  templateUrl: './alt-media-service-request.component.html',
  styleUrls: ['./alt-media-service-request.component.css']
})
export class AltMediaServiceRequestComponent implements OnInit {

  title;
  myForm: FormGroup;

  // intake object initialized to blank
  myModel;

  subscription;

  formName: string = FormName.ALT_MEDIA_REQUEST; // 'altMediaRequest';

  // not used
  altbooks: any[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ajaxService: AjaxService,
    private lastOpStatusService: LastOperationStatusService, ) {



    // myForm is a FormGroup which contains an empty FormArray
    this.myForm = this.fb.group({
      altFormatDetail: this.fb.array([]),

      fullName: ['', Validators.required],
      collegeId: ['', Validators.required],
      email: [''],
      cellPhone: [''],

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
      const control = <FormArray>this.myForm.controls['altFormatDetail'];

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


    const control = <FormArray>this.myForm.controls['altFormatDetail'];

    console.log("control, before delete=", control);

    // https://stackoverflow.com/questions/43520010/angular-4-form-formarray-add-a-button-to-add-or-delete-a-form-input-row/43521492
    control.removeAt(i);

    // control.controls.splice(i, 1);

    console.log("control, after delete=", control);

    // controlArr.delete(i);
    // _.without(control.controls, i);

  }

  savedForm;
  newKey;

  createOrEditForm() {

    console.log(this.myForm.value);


    if (this.myForm.dirty) {


      this.savedForm = new SavedForm({
        formName: this.formName,
        user: 'nobody',
        form: this.myForm.value,
        edited: false,
        // created: curTime,
        // lastMod: curTime,

      });

      // this.newKey = this.itemsRef.push(this.savedForm).key;

      // set the status message that will be shown in the newForm page
      this.lastOpStatusService.setStatus(StatusMessage.FORM_SUBMIT_SUCCESS);

      // goto /newForm
      this.router.navigate([UrlConfig.NEW_FORM_ABSOLUTE ]);


    }



  }

  showForm() {
    console.log(this.myForm);
  }

  get formAltFormatDetail() { return <FormArray> this.myForm.get('altFormatDetail'); }




}

