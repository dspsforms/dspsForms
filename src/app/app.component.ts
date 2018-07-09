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


    // this.breadcrumbService.hideRoute('/newForm');
    // this.breadcrumbService.hideRoute('/submittedForm');
    
  }

  getNameForUser(id: string): string {
    console.log("getNameForUser", id);
    return 'student';
  }

  getIntakeLeaf(id: string): string {
    console.log("getNameForUser", id);
    return 'student';
  }

  getAltReqLeaf(id: string): string {
    console.log("getNameForUser", id);
    return 'request';
  }

  getAppServicesReqLeaf(id: string): string {
    console.log("getAppServicesReqLeaf", id);
    return 'student';
  }

  // <sr-chef-image></sr-chef-image>
}
