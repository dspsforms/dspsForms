import { Component, OnInit, OnDestroy, Input } from '@angular/core';
// import { FireDbService } from '../../shared/fire-db.service';
import { Config } from '../../model/config';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormUtil } from '../../model/form.util';
import { UrlConfig } from '../../model/url-config';
import { FormsService } from '../../service/forms.service';
import { map } from 'rxjs/operators';

// list forms of a give type -- intakeForm, etc.
@Component({
  selector: 'list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.css']
})
export class ListFormsComponent implements OnInit, OnDestroy {

    list;
    dbSubscription;
    paramSubscription;

    busy = false;

    jsonFormat = false;

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

          /* TODO
            let dbPath = Config.DB_FORM_SAVE_ROOT + '/' + this.formInfo.formName;

            console.log("dbPath", dbPath);

            this.dbSubscription = this.fireDbService.db.list(dbPath,
                ref => ref.orderByChild('created'))
                //.valueChanges()
                .snapshotChanges()
                .map(arr => arr.reverse())
                .subscribe(dbList => {
                    console.log("dbList", dbList);
                    this.list = dbList;


                    this.busy = false;

                }); // db subscription

              */

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
