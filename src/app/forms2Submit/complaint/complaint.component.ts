import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormSubmit } from '../abstract-form-submit';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/service/forms.service';
import { Recaptchav3Service } from 'src/app/service/recaptchav3.service';
import { LastOperationStatusService } from 'src/app/service/last-operation-status.service';
import { FormName } from 'src/app/model/form.util';
import { FormValidators } from 'src/app/service/form-validators';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent extends AbstractFormSubmit implements OnInit, OnDestroy {

  constructor(fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service) {

      super(FormName.COMPLAINT, router, route, formService, lastOpStatusService, recaptchaV3Service);

      this.form = fb.group({
        firstName: ['', Validators.required],
        middle: [''],
        lastName: ['', Validators.required],
        addressLine1: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        phone: ['', Validators.required] ,
        email: ['', [Validators.required, Validators.email]],
        incidentDesc: ['', Validators.required],
        otherSteps: [null, Validators.required],
        stepsTaken: [''],
        legalSteps: [null, Validators.required],
        legalStepsTaken: [''],
        signature: ['', Validators.required],
      });
    }


    get email() {
      return this.form.get('email');
    }

  showForm() {
    console.log(this.form);
  }

}
