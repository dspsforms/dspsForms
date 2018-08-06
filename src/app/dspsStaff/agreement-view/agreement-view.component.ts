import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsService } from '../../service/forms.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormUtil } from '../../model/form.util';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { AuthService } from '../../auth/auth.service';
import { AuthType } from '../../auth/auth-type.model';

@Component({
  selector: 'app-agreement-view',
  templateUrl: './agreement-view.component.html',
  styleUrls: ['./agreement-view.component.css']
})
export class AgreementViewComponent implements OnInit , OnDestroy {

  constructor(private formService: FormsService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  paramSub: Subscription;
  getDataSub: Subscription;
  formData;
  createdOrEditedBy;
  busy: boolean;
  initialized: boolean;
  title: string;

  auth: AuthType;

  authChange: Subscription;

  ngOnInit() {

    this.busy = true;
    this.initialized = false;

     // initialize with current auth
     this.auth = this.authService.getAuth();

     // listen to changes
     this.authChange = this.authService.getAuthStatusListener().subscribe(auth => {
       this.auth = auth;
     });

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

  get loggedIn() {
    if (this.auth && (this.auth.staffAuth || this.auth.adminAuth) ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.getDataSub);
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.authChange);

  }

}
