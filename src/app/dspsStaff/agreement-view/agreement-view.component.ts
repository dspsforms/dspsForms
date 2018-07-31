import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsService } from '../../service/forms.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormUtil } from '../../model/form.util';
import { SubscriptionUtil } from '../../shared/subscription-util';

@Component({
  selector: 'app-agreement-view',
  templateUrl: './agreement-view.component.html',
  styleUrls: ['./agreement-view.component.css']
})
export class AgreementViewComponent implements OnInit , OnDestroy{

  constructor(private formService: FormsService,
    private route: ActivatedRoute) { }

  paramSub: Subscription;
  getDataSub: Subscription;
  formData;
  createdOrEditedBy;
  busy: boolean;
  initialized: boolean;
  title: string;

  ngOnInit() {

    this.busy = true;
    this.initialized = false;

    this.paramSub = this.route.params.subscribe(
      params => {
        console.log("params", params);

        this.getDataSub = this.formService.getAgreementRetrievedListener().subscribe(
          agreementData => {

            console.log("back from server, agreementData=", agreementData);

            if (agreementData && agreementData.form) {
              this.formData = agreementData.form;

              // this.form.get('agreementForForm').setValue(formData.agreementForForm);
              // this.form.get('agreement').setValue(formData.agreement);
              // this.form.get('createdOrEditedById').setValue(formData.createdOrEditedById); // previous creator
            }
            this.busy = false;
            this.initialized = true;
          }, err => {
            console.log(err); // there is probably no existing agreement, which is ok
            this.busy = false;
            this.initialized = true;
        });


        const agreementForForm = params['agreementForForm'];

        // this.form.get('agreementForForm').setValue(agreementForForm);

        this.title = "User Agreement - " + FormUtil.formTitle(agreementForForm);  // "Intake Form, etc";


        // fetch existing data if it exists
        this.formService.getAgreement(agreementForForm);

      });
  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.getDataSub);
    SubscriptionUtil.unsubscribe(this.paramSub);

  }

}
