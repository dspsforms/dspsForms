import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormUtil } from '../../model/form.util';
import { UrlConfig } from '../../model/url-config';
import { FormsService } from '../../service/forms.service';
import { Subscription } from 'rxjs';
import { WrappedForm } from '../../model/wrapped-form.model';
import { PaginationService } from '../pagination/pagination.service';

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

  maxItems: number;

  pageSize = 5;
  numPages: number;

  currentPage = 1; // starting at index == 1

  pageInfoChangeSub: Subscription;


  constructor(private formService: FormsService,
    private paginationService: PaginationService,
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
            .subscribe(formsData => {
              this.list = formsData.items;
              this.maxItems = formsData.maxItems;
              this.busy = false;
            });

      if (!this.pageSize || !this.currentPage) {
        console.log("listForms: illegal (pageSize, currentPage) during init", this.pageSize, this.currentPage);
      } else {
        console.log("listForms: valid (pageSize, currentPage) during init", this.pageSize, this.currentPage);
        this.formService.listForms2(this.formInfo.formName,
          this.pageSize, this.currentPage);
      }


    }); // param subscription


    this.pageInfoChangeSub = this.paginationService.getPageInfoChangeListener()
      .subscribe(pageInfoData => {
        this.currentPage = pageInfoData.currentPage;
        this.pageSize = pageInfoData.pageSize;

        if (!this.pageSize || !this.currentPage) {
          console.log("listForms: illegal (pageSize, currentPage) from paginationService", this.pageSize, this.currentPage);
        } else {
          console.log("listForms: valid (pageSize, currentPage) from paginationService", this.pageSize, this.currentPage);
          this.formService.listForms2(this.formInfo.formName,
            this.pageSize, this.currentPage);
        }

      });


  } // ngOnInit

  /*
  onPageChange(event) {
    console.log("listForms, onPageChange, event=", event);
    this.currentPage = event.currentPage;
    this.pageSize = event.pageSize;
    this.formService.listForms2(this.formInfo.formName, this.pageSize, this.currentPage);
  }
  */

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.dbSubscription);
    SubscriptionUtil.unsubscribe(this.paramSubscription);
  }

  toggleJsonFormat() {
    this.jsonFormat = !this.jsonFormat;
  }

  getKey(item) {
    return item._id;
  }

  getVal(item) {
    return item.form.fullName;
  }

  getFormName(item) {
    return item.formName;
  }

}
