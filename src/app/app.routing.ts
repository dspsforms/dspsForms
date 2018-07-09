
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';
// import { LoginComponent } from './shared/login.component';


import { ConfirmDeactivate } from './shared/confirm-deactivate.service';

import { UrlConfig } from './model/url-config';

import { LogoutComponent } from './logout/logout.component';
import { IntakeInterviewFormComponent } from './forms2Submit/intake-interview-form/intake-interview-form.component';
import { ListEmptyFormTypesComponent } from './forms2Submit/manageForms2Submit/list-empty-form-types/list-empty-form-types.component';

import { ListFormTypesComponent } from './dspsStaff/list-form-types/list-form-types.component';
import { ListFormsComponent } from './dspsStaff/list-forms/list-forms.component';


/* temporarily commented out
import { ViewFormComponent } from './dspsStaff/view-form/view-form.component';
import { AltMediaServiceRequestComponent } from './forms2Submit/alt-media-service-request/alt-media-service-request.component';
import { ListFormTypesComponent } from './dspsStaff/list-form-types/list-form-types.component';

import { ApplicationForServicesComponent } from './forms2Submit/application-for-services/application-for-services.component';
*/

export const ngProjectRouting = RouterModule.forRoot([

    { path: '', component: ListEmptyFormTypesComponent },

    // 'newForm'
    { path: UrlConfig.NEW_FORM, component: ListEmptyFormTypesComponent },

    // 'newForm/intakeForm'
    { path: UrlConfig.NEW_FORM + '/' + UrlConfig.INTAKE_FORM , component: IntakeInterviewFormComponent },

    // 'newForm/altMediaRequest'
    // { path: UrlConfig.NEW_FORM + '/' + UrlConfig.ALT_MEDIA_REQUEST, component: AltMediaServiceRequestComponent },

    // 'newForm/applicationForServices'
    // { path: UrlConfig.NEW_FORM + '/' + UrlConfig.APPLICATION_FOR_SERVICES , component: ApplicationForServicesComponent },

    // 'submittedForm'
    { path: UrlConfig.SUBMITTED_FORM, component: ListFormTypesComponent },

    // 'submittedForm/:formName'
   { path: UrlConfig.SUBMITTED_FORM + '/:formName', component: ListFormsComponent } ,

    // 'submittedForm/:formName/:formKey'
    // { path: UrlConfig.SUBMITTED_FORM + '/:formName/:formKey', component: ViewFormComponent },

    // change this to a component that redirects out to the main website
    // {path: 'home', component: ListEmptyFormTypesComponent },

    {path: 'logout', component: LogoutComponent },
    { path: 'notfound', component: NotFoundComponent },
    { path: '**', redirectTo: 'notfound' },
]);
