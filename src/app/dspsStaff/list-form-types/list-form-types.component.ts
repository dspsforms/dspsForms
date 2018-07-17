import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FireDbService } from '../../shared/fire-db.service';
import { Config } from '../../model/config';
import { FormUtil } from '../../model/form.util';
import { UrlConfig } from '../../model/url-config';
import { FormsService } from '../../service/forms.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from '../../shared/subscription-util';

@Component({
  selector: 'app-list-form-types',
  templateUrl: './list-form-types.component.html',
  styleUrls: ['./list-form-types.component.css']
})
export class ListFormTypesComponent implements OnInit, OnDestroy {

  list;
  subscription;
  busy = false;

  private listChangeSub: Subscription;

  // /submitted2
  submittedAbs = UrlConfig.SUBMITTED_FORM_ABSOLUTE;

  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.list = [];

    this.busy = true;

    // set up a subscription for the data
    this.listChangeSub = this.formsService.getFormListUpdatedListener()
      .subscribe(formNameList => {
        this.busy = false;
        this.list = formNameList; // ['intakeForm', ... ]
      });

    // call the service to fetch the collection names from the server. when this completes, the subscription above will get the data.
    this.formsService.listFormTypes();
  }


      /*
      previously, with Firebase:

      .db.list(Config.DB_FORM_SAVE_ROOT,
      ref => ref.orderByChild('created'))
            .valueChanges().map(arr => arr.reverse())
            .subscribe(formTypeList => {
                console.log("formTypeList", formTypeList);
                this.list = formTypeList;


                this.busy = false;
            }) ;
      */


  // item is formName
  formTitle(item) {
    try {
      console.log(item);

      return FormUtil.formTitle(item);

    } catch (err) {
      console.log(err);
    }

  }

  // item is formName
  formName(item) {
    try {

      return item;

    } catch (err) {
      console.log(err);
    }

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.listChangeSub);
  }

}
