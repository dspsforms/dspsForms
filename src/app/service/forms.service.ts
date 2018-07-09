import { Injectable } from '@angular/core';
import { AjaxService } from '../shared/ajax.service';

import { environment } from '../../environments/environment';
import { UrlConfig } from '../model/url-config';


@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private ajaxService: AjaxService) {

  }

  listFormTypes() {
    return this.ajaxService.get (environment.server + '/api/forms') ;
  }

  listForms(formName: string) {
    return this.ajaxService.get (environment.server + '/api/form/' + formName) ;
  }
}
