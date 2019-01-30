import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WrappedForm } from 'src/app/model/wrapped-form.model';
import { FormsService } from 'src/app/service/forms.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';

@Component({
  selector: 'app-mark-archive',
  templateUrl: './mark-archive.component.html',
  styleUrls: ['./mark-archive.component.css']
})
export class MarkArchiveComponent implements OnInit , OnDestroy{

  @Input() data: WrappedForm;

  deleteClicked = false;

  patchSubscription: Subscription;

  busy = false;

  constructor(private formsService: FormsService, private location: Location) { }

  ngOnInit() {

    this.patchSubscription = this.formsService.getFormPatchStatusListener().subscribe(
      res => {
        this.busy = false;
        // data: WrappedForm, message, err?
        console.log("patchSubscription", res.message);
        if (res.err) {
          console.log(res.err);
        } else {
          this.data.state = res.data.state;

          // if (this.data.state !== 'current')
          this.location.back();
        }

      }
    );
  }

  archive() {
    console.log("archive clicked");
    console.log(this.data);
    // this.data.state = "archived";

    this.busy = true;
    this.formsService.patchForm({_id: this.data._id, state: "archived"}, this.data.formName);

  }

  makeCurrent() {
    console.log("makeCurrent clicked");
    console.log(this.data);

    // this.data.state = "current";

    this.busy = true;
    this.formsService.patchForm({_id: this.data._id, state: "current"}, this.data.formName);

  }

  delete() {
    console.log("delete clicked");
    console.log(this.data);
    this.deleteClicked = true;
    // this.data.state = "deleted";
  }

  deleteConfirmed() {
    this.deleteClicked = false;

    this.busy = true;
    this.formsService.patchForm({_id: this.data._id, state: "deleted"}, this.data.formName);

  }

  deleteCancelled() {
    this.deleteClicked = false;

  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.patchSubscription);
  }

}
