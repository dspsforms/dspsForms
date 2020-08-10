
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
import { ComplaintComponent } from './forms2Submit/complaint/complaint.component';
import { HistoryDisabilityComponent } from './forms2Submit/history-disability/history-disability.component';
import { SearchResultsComponent } from './dspsStaff/search-results/search-results.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { IsloggedinGuard } from './auth/isloggedin-guard';


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

     // 'newForm/complaint'
     { path: UrlConfig.NEW_FORM + '/' + UrlConfig.COMPLAINT , component: ComplaintComponent , canActivate: [CaptchaScorer]},

     // 'newForm/historyOfDisability'
     { path: UrlConfig.NEW_FORM + '/' + UrlConfig.HISTORY_OF_DISABILITY , component: HistoryDisabilityComponent , canActivate: [CaptchaScorer]},


    // 'submittedForm'
    { path: UrlConfig.SUBMITTED_FORM, component: ListFormTypesComponent  , canActivate: [StaffAuthGuard] }, // protected

    // 'submittedForm/:formName' and 'submittedForm/:formName/:state'
  { path: UrlConfig.SUBMITTED_FORM + '/:formName/:state', component: ListFormsComponent, canActivate: [StaffAuthGuard] }, //
  { path: UrlConfig.SUBMITTED_FORM + '/:formName', component: ListFormsComponent  , canActivate: [StaffAuthGuard] } , //

    // 'submittedForm/:formName/:state/:_id'
  { path: UrlConfig.SUBMITTED_FORM + '/:formName/:state/:_id', component: ViewFormComponent, canActivate: [StaffAuthGuard] },

  // 'search/:searchTerm/'
  { path: UrlConfig.SEARCH + '/:searchTerm', component: SearchResultsComponent  , canActivate: [StaffAuthGuard] },

    // change this to a component that redirects out to the main website
    // {path: 'home', component: ListEmptyFormTypesComponent },

    {path: UrlConfig.ADD_NEW_STAFF_USER, component: AddNewStaffComponent , canActivate: [AdminAuthGuard] }, //
  { path: UrlConfig.LOGIN, component: LoginComponent },
  {path: UrlConfig.CHANGE_PASSWORD, component: ChangePasswordComponent , canActivate: [IsloggedinGuard] },

    {path: UrlConfig.SHOW_USERS, component: ListUsersComponent, canActivate: [StaffAuthGuard]} ,

    // agreement pages
    {path: UrlConfig.AGREEMENT_CREATE_EDIT + '/:agreementForForm' , component: AgreementCreateEditComponent, canActivate: [CaptchaScorer]} , // , canActivate: [StaffAuthGuard]

    // agreement pages
    {path: UrlConfig.AGREEMENT_VIEW + '/:agreementForForm', component: AgreementViewComponent , canActivate: [CaptchaScorer]} ,


    { path: 'notfound', component: NotFoundComponent , canActivate: [CaptchaScorer]},
    { path: 'foo', component: NotFoundComponent} ,
    { path: '**', redirectTo: 'notfound' , canActivate: [CaptchaScorer]},
]);
