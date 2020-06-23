import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsService } from 'src/app/service/forms.service';
import { Router } from '@angular/router';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  // june 2020

  @Input() inSearchTerm;
  searchTermSub: Subscription;
  searchForm: FormGroup;

  constructor(
    private formService: FormsService,
    private router: Router) {}



  ngOnInit() {

    this.searchForm = new FormGroup({
      searchTerm: new FormControl(this.inSearchTerm || null , {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(3)]  // , Validators.minLength(3), SearchComponent.noWildCard
      })
    });
  }

  onEnterKeyDownSearch(event) {
    this.search();
  }

  search() {
    if (!this.searchForm.valid) {
      console.log('searchForm is not filled, cannot submit');
      return;
    }

    const searchTerm = this.searchForm.get('searchTerm').value;
    // verify searchTerm
    if (! searchTerm  || searchTerm.indexOf('*') >= 0 ) {
      console.log("search, illegal searchTerm ", searchTerm);
      return;
    }



    this.searchTermSub = this.formService.getFormsFromSearchListener()
      .subscribe(searchResult => {
        console.log(searchResult);

        // do some additional checks here. if there is an error
        // or no results found, don't navigate away
        if (searchResult) {
          this.router.navigate(['search', searchTerm]);
        }

      });

    this.formService.search(this.searchForm.get('searchTerm').value);



  }

  // must not have the * wild card
  static noWildCard(control: FormControl) {
    // if no value, let required-check handle it, i.e., return null
    if (!control || !control.value) {
      return null;
    }

  // control.value is not null. it could still be a whitespace.
    if (control.value.indexOf('*') > 0) {
      return { noWildCard: true }; // it's obviously the opposite of true, but need this form of retrn value
    } else {
        return null;;
    }

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.searchTermSub);

  }

}
