import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormUtil } from '../../model/form.util';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormsService } from '../../service/forms.service';
import { SafeHtmlPipe } from '../../util/safe-html.pipe';

@Component({
  selector: 'app-agreement-view-dialog',
  templateUrl: './agreement-view-dialog.component.html',
  // styleUrls: ['./agreement-view-dialog.component.css']
})
export class AgreementViewDialogComponent implements OnInit, OnDestroy {

  // formName and formService will come from caller of the dialog, as data
  formName: string;
  formService: FormsService;

  getDataSub: Subscription;
  formData;
  busy: boolean;
  initialized: boolean;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogParams: any) {

  }

  ngOnInit() {
    this.busy = true;
    this.initialized = false;
    this.formName = this.dialogParams.formName;
    this.formService = this.dialogParams.formService;

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


    this.title = "User Agreement - " + FormUtil.formTitle(this.formName);  // "Intake Form, etc";


    // fetch existing data if it exists
    this.formService.getAgreement(this.formName);

  }


  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.getDataSub);

  }

}
