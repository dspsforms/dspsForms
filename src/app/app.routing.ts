
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
// import { LoginComponent } from './shared/login.component';


import { ConfirmDeactivate } from './shared/confirm-deactivate.service';

import { UrlConfig } from './model/url-config';

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
import { ListUsersComponent } from './user/list-users/list-users.component';
import { AdminOrStaffAuthGuard } from './auth/admin-or-staff-auth-guard';
import { EmergencyEvacuationComponent } from './forms2Submit/emergency-evacuation/emergency-evacuation.component';
import { FeedbackComponent } from './forms2Submit/feedback/feedback.component';
import { AgreementCreateEditComponent } from './dspsStaff/agreement-create-edit/agreement-create-edit.component';
import { AgreementViewComponent } from './dspsStaff/agreement-view/agreement-view.component';
import { CaptchaScorer } from './captcha-scorer';


/* temporarily commented out


*/

export const ngProjectRouting = RouterModule.forRoot([

    { path: '', component: ListEmptyFormTypesComponent , canActivate: [CaptchaScorer]},

    // 'newForm'
    { path: UrlConfig.NEW_FORM, component: ListEmptyFormTypesComponent , canActivate: [CaptchaScorer]},

    // 'newForm/intakeForm'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.INTAKE_FORM , component: IntakeInterviewFormComponent , canActivate: [CaptchaScorer]},

    // 'newForm/altMediaRequest'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.ALT_MEDIA_REQUEST, component: AltMediaServiceRequestComponent , canActivate: [CaptchaScorer] },

    // 'newForm/applicationForServices'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.APPLICATION_FOR_SERVICES , component: ApplicationForServicesComponent , canActivate: [CaptchaScorer] },

     // 'newForm/emergencyEvacInfo'
     { path: UrlConfig.NEW_FORM + '/' + UrlConfig.EMERGENCY_EVAC_INFO , component: EmergencyEvacuationComponent , canActivate: [CaptchaScorer]},

     // 'newForm/feedback'
     { path: UrlConfig.NEW_FORM + '/' + UrlConfig.FEEDBACK , component: FeedbackComponent , canActivate: [CaptchaScorer]},


    // 'submittedForm'
    { path: UrlConfig.SUBMITTED_FORM, component: ListFormTypesComponent  , canActivate: [StaffAuthGuard] }, // protected

    // 'submittedForm/:formName'
   { path: UrlConfig.SUBMITTED_FORM + '/:formName', component: ListFormsComponent  , canActivate: [StaffAuthGuard] } , //

    // 'submittedForm/:formName/:_id'
    { path: UrlConfig.SUBMITTED_FORM + '/:formName/:_id', component: ViewFormComponent  , canActivate: [StaffAuthGuard] },

    // change this to a component that redirects out to the main website
    // {path: 'home', component: ListEmptyFormTypesComponent },

    {path: UrlConfig.ADD_NEW_STAFF_USER, component: AddNewStaffComponent , canActivate: [AdminAuthGuard] }, //
    {path: UrlConfig.LOGIN, component: LoginComponent },

    {path: UrlConfig.SHOW_USERS, component: ListUsersComponent, canActivate: [StaffAuthGuard]} ,

    // agreement pages
    {path: UrlConfig.AGREEMENT_CREATE_EDIT + '/:agreementForForm' , component: AgreementCreateEditComponent, canActivate: [CaptchaScorer]} , // , canActivate: [StaffAuthGuard]

    // agreement pages
    {path: UrlConfig.AGREEMENT_VIEW + '/:agreementForForm', component: AgreementViewComponent , canActivate: [CaptchaScorer]} ,


    { path: 'notfound', component: NotFoundComponent , canActivate: [CaptchaScorer]},
    { path: 'foo', component: NotFoundComponent} ,
    { path: '**', redirectTo: 'notfound' , canActivate: [CaptchaScorer]},
]);
