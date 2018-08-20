import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LastOperationStatusService } from '../../service/last-operation-status.service';
import { FormName } from '../../model/form.util';
import { FormsService } from '../../service/forms.service';
import { FormValidators } from '../../service/form-validators';
import { Recaptchav3Service } from '../../service/recaptchav3.service';
import { AbstractFormSubmit } from '../abstract-form-submit';

@Component({
  selector: 'app-application-for-services',
  templateUrl: './application-for-services.component.html',
  styleUrls: ['./application-for-services.component.css']
})
export class ApplicationForServicesComponent  extends AbstractFormSubmit implements OnInit, OnDestroy {

  /*
  title: string;
  form: FormGroup;

  savedForm: SavedForm;
  err: string;
  errMsg: string;
  formSaveStatusSub: Subscription;

  formName: string = FormName.APPLICATION_FOR_SERVICES; // 'applicationForServices';

  captchaError = false;
  captchaTokenSub: Subscription;
  sequenceNumber: number;

  */

  constructor(fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service)
  {
    super(FormName.APPLICATION_FOR_SERVICES, router, route, formService, lastOpStatusService, recaptchaV3Service);
    this.form = fb.group({
      initialDate: ['', Validators.required],
      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat]] ,
      phone: ['', Validators.required],
      studentSignature: ['', Validators.required],
    });

  }

  get collegeId() {
    return this.form.get('collegeId');
  }


}
