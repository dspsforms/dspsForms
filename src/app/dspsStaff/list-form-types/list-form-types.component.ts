import { Component, OnInit } from '@angular/core';
// import { FireDbService } from '../../shared/fire-db.service';
import { Config } from '../../model/config';
import { FormUtil } from '../../model/form.util';
import { UrlConfig } from '../../model/url-config';
import { FormsService } from '../../service/forms.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-form-types',
  templateUrl: './list-form-types.component.html',
  styleUrls: ['./list-form-types.component.css']
})
export class ListFormTypesComponent implements OnInit {

  list;
  subscription;
  busy = false;

  // /submitted2
  submittedAbs = UrlConfig.SUBMITTED_FORM_ABSOLUTE;

  constructor(private formsService: FormsService) { }

  ngOnInit() {

    this.list = [];
    this.subscription = this.formsService.listFormTypes()
      .pipe(map(wrappedCollections => {
         // change intakeforms to intakeForm, etc.
        console.log("wrappedCollections", wrappedCollections);

        const foo = wrappedCollections as { message: string; collections: any[] };

        /*
    collections:  [ { name: 'intakeforms',
    type: 'collection',
    options: {},
    info: { readOnly: false, uuid: [Object] },
    idIndex:
     { v: 2,
       key: [Object],
       name: '_id_',
       ns: 'simpledsps.intakeforms' } } ]
       */

        return foo.collections.map(collection => {
          const formName = FormUtil.collection2FormName(collection.name);
          return formName;

        });

      })) // pipe
      .subscribe(formNames => {

      console.log("formNames", formNames);
      this.list = formNames;
      this.busy = false;

    });
      /* .db.list(Config.DB_FORM_SAVE_ROOT,
      ref => ref.orderByChild('created'))
            .valueChanges().map(arr => arr.reverse())
            .subscribe(formTypeList => {
                console.log("formTypeList", formTypeList);
                this.list = formTypeList;


                this.busy = false;
            }) ;
      */
  }

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

}
