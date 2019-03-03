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
  selector: 'app-history-disability',
  templateUrl: './history-disability.component.html',
  styleUrls: ['./history-disability.component.css']
})
export class HistoryDisabilityComponent extends AbstractFormSubmit  implements OnInit , OnDestroy {

  constructor(fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public formService: FormsService,
    public lastOpStatusService: LastOperationStatusService,
    public recaptchaV3Service: Recaptchav3Service)
  {
    super(FormName.HISTORY_OF_DISABILITY, router, route, formService, lastOpStatusService, recaptchaV3Service);

    this.form = fb.group({
      fullName: ['', Validators.required],
      collegeId: ['', [Validators.required, FormValidators.collegeIdFormat]] ,
      referrer: [''],
      whenStrugglesStarted: [''],
      specialEdOrMore: [''],
      challengesInSchool: [''],
      instructorFamilyMemberBelief: [''],
    });

  }

  get collegeId() {
    return this.form.get('collegeId');
  }

}
