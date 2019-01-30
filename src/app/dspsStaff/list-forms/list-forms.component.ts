import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from '../../shared/subscription-util';
import { FormUtil } from '../../model/form.util';
import { UrlConfig } from '../../model/url-config';
import { FormsService } from '../../service/forms.service';
import { Subscription } from 'rxjs';
import { WrappedForm } from '../../model/wrapped-form.model';
import { PaginationService } from '../pagination/pagination.service';
import { Constants } from '../../constants/constants';

// list forms of a give type -- intakeForm, etc.
@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.css']
})
export class ListFormsComponent implements OnInit, OnDestroy {

  list;
  private dbSubscription: Subscription;
  private paramSubscription: Subscription;

  busy = false;

  jsonFormat = false;

  state = "current"; // values: current, archived, deleted. investigate enums


  formInfo = { formName: '', formTitle: ''};

    // /submitted2
  submittedAbs = UrlConfig.SUBMITTED_FORM_ABSOLUTE;

  maxItems: number;

  pageSize = Constants.DEFAULT_PAGE_SIZE;
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

      this.state = params["state"] || 'current';

      this.busy = true;

      this.list = [];


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
        this.formService.listForms2(this.formInfo.formName, this.state,
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
          this.formService.listForms2(this.formInfo.formName, this.state,
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

  isCorrectState(itemState) {
    // for current: (!itemState || itemState === this.state)
    // for others: itemState === this.state

    if (!this.state || this.state === 'current') {
      if (!itemState || itemState === 'current') {
        return true;
      } else {
        return false;
      }
    } else {
      return itemState === this.state;
    }
  }

}
