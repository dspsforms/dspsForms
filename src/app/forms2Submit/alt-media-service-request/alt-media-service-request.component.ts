import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { LastOperationStatusService } from '../../service/last-operation-status.service';

import { FormName } from '../../model/form.util';
import { FormsService } from '../../service/forms.service';
import { FormValidators } from '../../service/form-validators';
import { AbstractFormSubmit } from '../abstract-form-submit';
import { Recaptchav3Service } from '../../service/recaptchav3.service';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from '../../shared/subscription-util';

@Component({
  selector: 'app-alt-media-service-request',
  templateUrl: './alt-media-service-request.component.html',
  styleUrls: ['./alt-media-service-request.component.css']
})
export class AltMediaServiceRequestComponent extends AbstractFormSubmit
  implements OnInit, OnDestroy , AfterViewInit {

  /*
  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.ALT_MEDIA_REQUEST; // 'altMediaRequest';
  */

  @ViewChildren('altFormatItem') childChildren: QueryList<ElementRef>;

  afterViewInitSubscription: Subscription;

  // number of elements in formArray
  prevSizeFormArray = 0;


  constructor(public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service)
  {
    super(FormName.ALT_MEDIA_REQUEST, router, route, formService, lastOpStatusService, recaptchaV3Service);

    // myForm is a FormGroup which contains an empty FormArray
    this.form = this.fb.group({
      altFormatDetail: this.fb.array([]),

      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat] ],
      email: ['', [Validators.required, Validators.email]],
      cellPhone: ['', Validators.required],

      // Choose a specific file format from the list below.
      // You may choose first and second choice.
      preferredFileFormat: this.fb.group({
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

    super.ngOnInit();

    // add one row. if more rows are added, form validation will need all rows to be valid

    this.prevSizeFormArray = 1;
    this.addRow();

  }

  /*
  ideas from https://stackoverflow.com/questions/41190075/how-do-i-programmatically-set-focus-to-dynamically-created-formcontrol-in-angula#

  */


  ngAfterViewInit() {
    console.log("ngAfterViewInit outer");
    this.afterViewInitSubscription = this.childChildren.changes.subscribe(children => {

      // get current number of elements in formArray
      const control = <FormArray>this.form.controls['altFormatDetail'];

      // check if prevSize is same or different. if different, change focus. otherwise leave as is
      if (this.prevSizeFormArray !== control.length) {
        console.log("ngAfterViewInit: changing focus children.last=", children.last);
        children.last.nativeElement.focus();
        this.prevSizeFormArray = control.length;
      }
    });
  }

  // need for dynamic adds of elements to re
 // focus may not be needed by others
 trackByFn(index: any, item: any) {
    return index;
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

  }


  showForm() {
    console.log(this.form);
  }

  get formAltFormatDetail() { return <FormArray>this.form.get('altFormatDetail'); }

  get email() {
    return this.form.get('email');
  }

  get collegeId() {
    return this.form.get('collegeId');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    SubscriptionUtil.unsubscribe(this.afterViewInitSubscription);
  }

}

