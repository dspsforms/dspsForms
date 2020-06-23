import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/service/forms.service';
import { UrlConfig } from 'src/app/model/url-config';
import { FormUtil } from 'src/app/model/form.util';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  paramSub: Subscription;
  searchTermSub: Subscription;

  searchTerm: string;

  listOfForms : {};

  busy = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formsService: FormsService) { }

  ngOnInit() {

    this.paramSub = this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('searchTerm')) {
        console.log("no search term");
        return;
      }


      this.searchTerm = paramMap.get('searchTerm');
      console.log("search resutls for ", this.searchTerm);

      // the result has already been pulled by SearchComponent
      // before we got routed here. it's cached in formsService
      this.listOfForms = this.formsService.getSearchResult(this.searchTerm);

      // in the event the user came to this url via a bookmark
      // issue a search request to server
      if (!this.listOfForms) {
        this.busy = true;
        this.searchTermSub = this.formsService.getFormsFromSearchListener()
          .subscribe(msgFormData => {

            this.busy = false;
            console.log(msgFormData);
            this.listOfForms = msgFormData['listOfForms'];
          });

        this.formsService.search(this.searchTerm);
      }
    });
  }


  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.paramSub);
    SubscriptionUtil.unsubscribe(this.searchTermSub);
  }

  get keys() {
    if (this.listOfForms) {
      return Object.keys(this.listOfForms);
    } else {
      return null;
    }
  }

  getFormTitle(key) {
    return FormUtil.formTitle(key);
  }
  showForm(form) {
    /*

    form.formName
    form._id
    form.state -- if empty, change this to current

    url is of the form
      /submittedForm/intakeForm/current/5b7bba4198d45e0eb38cfd38

    */

    this.router.navigate([
      UrlConfig.SUBMITTED_FORM_ABSOLUTE,
      form.formName,
      form.state || 'current',
      form._id
    ]);
  }

}
