import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbService } from 'ng5-breadcrumb';

@Component({
  selector: 'app-root',
  template: `
  <nav-bar></nav-bar>
  <breadcrumb></breadcrumb>
  <router-outlet></router-outlet>
  ` ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private breadcrumbService: BreadcrumbService) {

    // breadcrumbs: https://github.com/akiocloud/ng5-breadcrumb
    this.initBreadCrumbLabels();

  }

  initBreadCrumbLabels() {
    this.breadcrumbService.addFriendlyNameForRoute('/newForm', 'New');

    this.breadcrumbService.addFriendlyNameForRoute('/newForm/intakeForm', 'Intake');
    this.breadcrumbService.addFriendlyNameForRoute('/newForm/altMediaRequest', 'Alt Media Request');


    this.breadcrumbService.addFriendlyNameForRoute('/submittedForm', 'Submitted');
    this.breadcrumbService.addFriendlyNameForRoute('/submittedForm/intakeForm', 'Intake');
    this.breadcrumbService.addFriendlyNameForRoute('/submittedForm/altMediaRequest', 'Alt Media Request');

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/intakeForm/[a-zA-Z0-9_\-]', this.getIntakeLeaf);

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/altMediaRequest/[a-zA-Z0-9_\-]', this.getAltReqLeaf);

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/applicationForServices/[a-zA-Z0-9_\-]', this.getAppServicesReqLeaf);

    // login?next=...  -- nothing
    this.breadcrumbService.hideRouteRegex('/login');

    // agreementView/intakeForm
    this.breadcrumbService.hideRouteRegex('/agreementView');
    this.breadcrumbService.hideRouteRegex('/agreementView/[a-zA-Z0-9_\-]');

    // /agreementCreateEdit/emergencyEvacInfo
    this.breadcrumbService.hideRouteRegex('/agreementCreateEdit');
    this.breadcrumbService.hideRouteRegex('/agreementCreateEdit/[a-zA-Z0-9_\-]');

    // feedback. if we don't want to show the last node in the tree.
    // however, this will remove the link to "all feedbacks" in the breadcrumb, which is not desirable
    // this.breadcrumbService.hideRouteRegex('/submittedForm/feedback/[a-zA-Z0-9_\-]');

    this.breadcrumbService.addCallbackForRouteRegex('/submittedForm/feedback/[a-zA-Z0-9_\-]', this.getFeedback);

    // this.breadcrumbService.hideRoute('/newForm');
    // this.breadcrumbService.hideRoute('/submittedForm');

  }

  getNameForUser(id: string): string {
    return 'student';
  }

  getIntakeLeaf(id: string): string {
    return 'student';
  }


  getAltReqLeaf(id: string): string {
    return 'request';
  }

  getAppServicesReqLeaf(id: string): string {
    return 'student';
  }

  getFeedback(id: string): string {
    return 'aFeedback';
  }

}
