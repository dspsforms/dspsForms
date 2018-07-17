import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// ref: https://www.npmjs.com/package/ng5-breadcrumb
import {Ng5BreadcrumbModule} from 'ng5-breadcrumb';

// these two are provided as .ts files, need to be compiled. currently gives build error
// import {Autosize} from 'ng-autosize/src/autosize.directive';
// import { AutosizeDirective } from 'angular-autosize';



import { AppComponent } from './app.component';
// import { FireDbService } from './shared/fire-db.service';
import { AjaxService } from './shared/ajax.service';
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


// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
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

    DateComponent,
    ListEmptyFormTypesComponent,

    ViewFormComponent,
    ListFormsComponent,

    ListFormTypesComponent,
    ViewIntakeComponent,
    ViewAltMediaRequestComponent,
    ViewApplicationForServicesComponent,
    AddNewStaffComponent,
    LoginComponent,


    /* Add these back




    */

  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,

    // Firebase stuff
    // AngularFireModule.initializeApp(environment.firebaseConfig, 'app-root'),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    Ng5BreadcrumbModule.forRoot(),

    ngProjectRouting
  ],
  providers: [
    // FireDbService,
    AjaxService,

    LastOperationStatusService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
