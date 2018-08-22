import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { MatButtonModule, MatInputModule, MatCardModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule } from "@angular/material";


// ref: https://www.npmjs.com/package/ng5-breadcrumb
import {Ng5BreadcrumbModule} from 'ng5-breadcrumb';

// recaptcha v2. not used anymore. we are using v3
// https://www.npmjs.com/package/ng-recaptcha

// import { RecaptchaModule } from 'ng-recaptcha';
// import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

// these two are provided as .ts files, need to be compiled. currently gives build error
// import {Autosize} from 'ng-autosize/src/autosize.directive';
// import { AutosizeDirective } from 'angular-autosize';



import { AppComponent } from './app.component';

import { SpinnerComponent } from './shared/spinner.component';
import { ngProjectRouting } from './app.routing';
import { NotFoundComponent } from './not-found.component';
import { ActiveLinkSRComponent } from './active-link-sr.component';
import { HomeComponent } from './home.component';
import { NavBarComponent } from './nav-bar.component';
import { LogoutComponent } from './logout/logout.component';
import { IntakeInterviewFormComponent } from './forms2Submit/intake-interview-form/intake-interview-form.component';
import { AltMediaServiceRequestComponent } from './forms2Submit/alt-media-service-request/alt-media-service-request.component';
import { ApplicationForServicesComponent } from './forms2Submit/application-for-services/application-for-services.component';


import { environment } from '../environments/environment';

import { DateComponent } from './shared/date/date.component';
import { ListEmptyFormTypesComponent } from './forms2Submit/manageForms2Submit/list-empty-form-types/list-empty-form-types.component';
import { LastOperationStatusService } from './service/last-operation-status.service';

import { ListFormTypesComponent } from './dspsStaff/list-form-types/list-form-types.component';
import { ListFormsComponent } from './dspsStaff/list-forms/list-forms.component';
import { ViewFormComponent } from './dspsStaff/view-form/view-form.component';
import { ViewIntakeComponent } from './dspsStaff/view-form/view-intake/view-intake.component';
import { ViewAltMediaRequestComponent } from './dspsStaff/view-form/view-alt-media-request/view-alt-media-request.component';

import { ViewApplicationForServicesComponent } from './dspsStaff/view-form/view-application-for-services/view-application-for-services.component';
import { AddNewStaffComponent } from './auth/add-new-staff/add-new-staff.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ListUsersComponent } from './user/list-users/list-users.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { AngularMaterialModule } from './angular-material.module';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmergencyEvacuationComponent } from './forms2Submit/emergency-evacuation/emergency-evacuation.component';
import { ViewEmergencyEvacuationComponent } from './dspsStaff/view-form/view-emergency-evacuation/view-emergency-evacuation.component';
import { FeedbackComponent } from './forms2Submit/feedback/feedback.component';
import { ViewFeedbackComponent } from './dspsStaff/view-form/view-feedback/view-feedback.component';
import { PaginationComponent } from './dspsStaff/pagination/pagination.component';
import { AgreementCreateEditComponent } from './dspsStaff/agreement-create-edit/agreement-create-edit.component';
import { AgreementViewComponent } from './dspsStaff/agreement-view/agreement-view.component';
import { AgreementViewDialogComponent } from './dspsStaff/agreement-view-dialog/agreement-view-dialog.component';
import { AgreementLinkDialogComponent } from './dspsStaff/agreement-link-dialog/agreement-link-dialog.component';




@NgModule({
  declarations: [
    // Autosize,
    // AutosizeDirective, // npm install angular-autosize, as opposed to ng-autosize

    AppComponent,
    SpinnerComponent,
    NotFoundComponent,
    HomeComponent,
    NavBarComponent,
    ActiveLinkSRComponent,
    LogoutComponent,
    IntakeInterviewFormComponent,
    AltMediaServiceRequestComponent,
    ApplicationForServicesComponent,
    EmergencyEvacuationComponent,
    FeedbackComponent,


    DateComponent,
    ListEmptyFormTypesComponent,

    ViewFormComponent,
    ListFormsComponent,

    ListFormTypesComponent,
    ViewIntakeComponent,
    ViewAltMediaRequestComponent,
    ViewApplicationForServicesComponent,
    ViewEmergencyEvacuationComponent,
    ViewFeedbackComponent,

    AddNewStaffComponent,
    LoginComponent,
    ListUsersComponent,
    ErrorComponent,
    PaginationComponent,
    AgreementCreateEditComponent,
    AgreementViewComponent,

    AgreementViewDialogComponent,
    AgreementLinkDialogComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,

    Ng5BreadcrumbModule.forRoot(),


    // recaptcha v2 stuff. we have move to v3.
    // these are from ng-recaptcha package
   // RecaptchaModule.forRoot(),
   // RecaptchaFormsModule,



    ngProjectRouting
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }

  ],
  // exports: [
  //   RecaptchaModule
  // ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, AgreementViewDialogComponent]
})
export class AppModule { }
