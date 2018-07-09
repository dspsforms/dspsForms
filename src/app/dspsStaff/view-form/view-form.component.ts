import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FireDbService } from '../../shared/fire-db.service';
import { Config } from '../../model/config';
// import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { WrappedForm } from '../../model/wrapped-form.model';
import { FormUtil } from '../../model/form.util';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit, OnDestroy {

  paramSubscription;
  busy = false;
  showJson = false;

  config: Config;

  formInfo = { formName: '', formTitle: '', formKey: ''};

  data: WrappedForm;

  constructor(private route: ActivatedRoute,
  )
  { }

  ngOnInit() {

    this.data = new WrappedForm({});
    this.paramSubscription = this.route.params.subscribe(
      params => {
        console.log("params", params);

        this.formInfo.formName = params['formName'];
        this.formInfo.formTitle = FormUtil.formTitle(this.formInfo.formName);
        this.formInfo.formKey = params['formKey'];

        this.data.formKey = params['formKey'];
        console.log("formInfo", this.formInfo);

        this.busy = true;
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

        this.data.item.subscribe(res => {
          console.log("res", res);
          this.data.form = res;
        },
          error => {
            console.log("error", error);
          }
        );



      }
    );
  }

  ngOnDestroy() {

  }

}
