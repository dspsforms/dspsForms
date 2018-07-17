
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
// import { LoginComponent } from './shared/login.component';


import { ConfirmDeactivate } from './shared/confirm-deactivate.service';

import { UrlConfig } from './model/url-config';

import { LogoutComponent } from './logout/logout.component';
import { IntakeInterviewFormComponent } from './forms2Submit/intake-interview-form/intake-interview-form.component';
import { AltMediaServiceRequestComponent } from './forms2Submit/alt-media-service-request/alt-media-service-request.component';
import { ApplicationForServicesComponent } from './forms2Submit/application-for-services/application-for-services.component';


import { ListEmptyFormTypesComponent } from './forms2Submit/manageForms2Submit/list-empty-form-types/list-empty-form-types.component';

import { ListFormTypesComponent } from './dspsStaff/list-form-types/list-form-types.component';
import { ListFormsComponent } from './dspsStaff/list-forms/list-forms.component';
import { ViewFormComponent } from './dspsStaff/view-form/view-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AddNewStaffComponent } from './auth/add-new-staff/add-new-staff.component';
import { AdminAuthGuard } from './auth/admin-auth-guard';
import { StaffAuthGuard } from './auth/staff-auth-guard';


/* temporarily commented out


*/

export const ngProjectRouting = RouterModule.forRoot([

    { path: '', component: ListEmptyFormTypesComponent },

    // 'newForm'
    { path: UrlConfig.NEW_FORM, component: ListEmptyFormTypesComponent },

    // 'newForm/intakeForm'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.INTAKE_FORM , component: IntakeInterviewFormComponent },

    // 'newForm/altMediaRequest'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.ALT_MEDIA_REQUEST, component: AltMediaServiceRequestComponent },

    // 'newForm/applicationForServices'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.APPLICATION_FOR_SERVICES , component: ApplicationForServicesComponent },

    // 'submittedForm'
    { path: UrlConfig.SUBMITTED_FORM, component: ListFormTypesComponent  , canActivate: [StaffAuthGuard] }, // protected

    // 'submittedForm/:formName'
   { path: UrlConfig.SUBMITTED_FORM + '/:formName', component: ListFormsComponent  , canActivate: [StaffAuthGuard] } ,

    // 'submittedForm/:formName/:_id'
    { path: UrlConfig.SUBMITTED_FORM + '/:formName/:_id', component: ViewFormComponent  , canActivate: [StaffAuthGuard] },

    // change this to a component that redirects out to the main website
    // {path: 'home', component: ListEmptyFormTypesComponent },

    {path: UrlConfig.ADD_NEW_STAFF_USER, component: AddNewStaffComponent, canActivate: [AdminAuthGuard] },
    {path: UrlConfig.LOGIN, component: LoginComponent },
    {path: UrlConfig.LOGOUT, component: LogoutComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: 'notfound' },
]);
