import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

import { AjaxService } from '../shared/ajax.service';

import { environment } from '../../environments/environment';
import { WrappedForm } from '../model/wrapped-form.model';
import { NgAnalyzedModules } from '../../../node_modules/@angular/compiler';




@Injectable({
  providedIn: 'root'
})
export class FormsService {

  // key == formName. value = WrappedForm[]
  formsMap = {};

  private currentForm: WrappedForm;
  private currentFormUpdated = new Subject<WrappedForm>();

  constructor(private ajaxService: AjaxService,
    private http: HttpClient) {

  }

  getCurrentFormUpdatedListener() {
    return this.currentFormUpdated.asObservable();
  }

  listFormTypes() {
    return this.ajaxService.get (environment.server + '/api/forms') ;
  }

  listForms(formName: string) {
    return this.ajaxService.get (environment.server + '/api/form/' + formName) ;
  }

  // /api/form/:formName
  getFormData(formName: string, _id: string) {
    const url = environment.server + '/api/form/' + formName + "/" + _id;
    console.log("fetching url=", url);
    return this.ajaxService.get (url) ;
  }

  // /api/form/:formName
  getFormData2(formName: string, _id: string) {
    const url = environment.server + '/api/form/' + formName + "/" + _id;
    console.log("fetching url=", url);
    this.http.get<{ message: string; formData: WrappedForm }>(url).subscribe(msgFormData => {
      console.log(msgFormData);
      this.currentForm = msgFormData.formData;

      // send out an event to those listening for change in currentForm
      this.currentFormUpdated.next(this.currentForm);
    } ) ;
  }
}
