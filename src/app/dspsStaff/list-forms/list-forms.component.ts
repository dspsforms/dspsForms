import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormUtil } from '../../model/form.util';
import { UrlConfig } from '../../model/url-config';
import { FormsService } from '../../service/forms.service';
import { Subscription } from 'rxjs';

// list forms of a give type -- intakeForm, etc.
@Component({
  selector: 'list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.css']
})
export class ListFormsComponent implements OnInit, OnDestroy {

    list;
    private dbSubscription: Subscription;
    private paramSubscription: Subscription;

    busy = false;

    jsonFormat = false;
    foo = true;

    formInfo = { formName: '', formTitle: ''};

    // /submitted2
    submittedAbs = UrlConfig.SUBMITTED_FORM_ABSOLUTE;


    constructor(private formService: FormsService,
        private _route: ActivatedRoute)
    { }

    ngOnInit() {

        this.paramSubscription = this._route.params.subscribe(params => {
          this.formInfo.formName = params["formName"];

          if (this.formInfo.formName) {
                this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
          } else {
              this.formInfo.formTitle = '';
          }



          this.busy = true;

          this.list = [];

          /*

          this works. the functionality has now been moved to FormsService

          this.dbSubscription = this.formService.listForms(this.formInfo.formName)
            .pipe(map(wrappedList => {
              console.log("wrappedList", wrappedList);

              const foo = wrappedList as { message: string; listOfForms: any };

              return foo.listOfForms.map(aForm => {
                return aForm;
              });
            })).subscribe(listOfForms => {
              console.log("listOfForms", listOfForms);
              this.list = listOfForms;
              this.busy = false;
            });

          */

          this.dbSubscription = this.formService.getFormUpdatedListener(this.formInfo.formName)
            .subscribe(listOfForms => {
              this.list = listOfForms;
              this.busy = false;
            });

          this.formService.listForms2(this.formInfo.formName);

        }); // param subscription


    }

    ngOnDestroy() {
        SubscriptionUtil.unsubscribe(this.dbSubscription);
        SubscriptionUtil.unsubscribe(this.paramSubscription);
    }

    toggleJsonFormat() {
        this.jsonFormat = !this.jsonFormat;
    }

    getKey(item) {
        console.log("item for key", item);

        return item._id;
    }

    getVal(item) {

        return item.form.fullName;
    }

    getFormName(item) {

        return item.formName;
    }

}
