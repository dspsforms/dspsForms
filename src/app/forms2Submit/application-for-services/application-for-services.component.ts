import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AjaxService } from '../../shared/ajax.service';
import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { SavedForm } from '../../model/saved-form.model';
import { StatusMessage } from '../../model/status-message';
import { UrlConfig } from '../../model/url-config';
import { FormUtil, FormName } from '../../model/form.util';
import { Subscription } from '../../../../node_modules/rxjs';
import { FormsService } from '../../service/forms.service';

@Component({
  selector: 'app-application-for-services',
  templateUrl: './application-for-services.component.html',
  styleUrls: ['./application-for-services.component.css']
})
export class ApplicationForServicesComponent implements OnInit {

  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.APPLICATION_FOR_SERVICES; // 'applicationForServices';

  constructor(fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormsService,
    private lastOpStatusService: LastOperationStatusService)
  {
    this.form = fb.group({
      initialDate: ['', Validators.required],
      fullName: ['', Validators.required],
      ssnCollegeId: ['', Validators.required],
      phone: ['', Validators.required],
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

  /*
  createOrEdit0() {

    if (this.form.dirty) {


      this.savedForm = new SavedForm({
        formName: this.formName,
        user: 'nobody',
        form: this.form.value,
        edited: false,
        // created: curTime,
        // lastMod: curTime,

      });

      // this.newKey = this.itemsRef.push(this.savedForm).key;

      console.log(this.newKey);

      // set the status message that will be shown in the newForm page
      this.lastOpStatusService.setStatus(StatusMessage.FORM_SUBMIT_SUCCESS);

      // goto /newForm
      this.router.navigate([UrlConfig.NEW_FORM_ABSOLUTE]);

    }



  }
  */

}
