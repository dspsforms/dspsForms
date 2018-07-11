import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FireDbService } from '../../shared/fire-db.service';
import { Config } from '../../model/config';
// import { AngularFireObject } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { WrappedForm } from '../../model/wrapped-form.model';
import { FormUtil } from '../../model/form.util';
import { FormsService } from '../../service/forms.service';
import { SubscriptionUtil } from '../../shared/subscription-util';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit, OnDestroy {

  paramSubscription;
  dbSubscription;

  busy = false;
  showJson = false;

  config: Config;

  formInfo = { formName: '', formTitle: '', _id: ''};

  data: WrappedForm;

  constructor(private route: ActivatedRoute, private formService: FormsService
  )
  { }

  ngOnInit() {

    this.data = new WrappedForm({});
    this.paramSubscription = this.route.params.subscribe(
      params => {
        console.log("params", params);

        this.formInfo.formName = params['formName'];
        this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
        this.formInfo._id = params['_id'];

        this.data.formKey = params['_id'];
        console.log("formInfo", this.formInfo);

        this.busy = true;

        /*

        this works. however, the functionality has now been moved to FormsService

        this.dbSubscription = this.formService.getFormData(this.formInfo.formName, this.formInfo._id)
            .pipe(map(msgFormData => {
              console.log("msgFormData", msgFormData);

              const foo = msgFormData as { message: string; formData: any };

              return foo.formData;
            })).subscribe(formData => {
              console.log("formData", formData);
              this.data = formData;
              this.busy = false;
          });
        */

       this.dbSubscription  = this.formService.getCurrentFormUpdatedListener().subscribe(formData => {
          this.data = formData;
          this.busy = false;
        });

        this.formService.getFormData2(this.formInfo.formName, this.formInfo._id);

        //  let dbPath = Config.DB_FORM_SAVE_ROOT + '/' + this.formInfo.formName + '/' + this.formInfo.formKey;

        // this.data.itemRef = this.fireDbService.db.object(Config.DB_FORM_SAVE_ROOT + this.data.formKey);

        // TODO
        // this.data.item = this.fireDbService.db.object(dbPath).valueChanges();
        /*
        this.data.item = this.data.itemRef.valueChanges();

        this.data.item.subscribe(val => {
          this.data.form = val;
        });
        */





      }
    );
  }

  ngOnDestroy() {

    SubscriptionUtil.unsubscribe(this.paramSubscription);
    SubscriptionUtil.unsubscribe(this.dbSubscription);

  }

}
