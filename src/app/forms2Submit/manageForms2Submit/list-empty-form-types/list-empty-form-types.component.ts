import { Component, OnInit } from '@angular/core';
import { FormUtil, FormName } from '../../../model/form.util';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from '../../../shared/subscription-util';
import { LastOperationStatusService } from '../../../service/last-operation-status.service';
import { UrlConfig } from '../../../model/url-config';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-list-empty-form-types',
  templateUrl: './list-empty-form-types.component.html',
  styleUrls: ['./list-empty-form-types.component.css']
})
export class ListEmptyFormTypesComponent implements OnInit {

  // display these, in this order
  // which is why, not using keys with FormUtil.formMap
  formNames = FormName.formNames; // ['intakeForm', 'altMediaRequest', 'applicationForServices'];

  newFormAbsolute2 = UrlConfig.NEW_FORM_ABSOLUTE2;


  server: string; // e.g., http://www.missioncollege.edu:3001 , no slash at end

  constructor(private route: ActivatedRoute,
    private lastOpStatusService: LastOperationStatusService, ) { }

  lastOpStatus;

  ngOnInit() {

    this.server = environment.server;

    /*
    if we reach here from another service that has just completed, get its
    status, and clear it (so if this or some other component is loaded again,
    the old status is not shown )
    */
    this.lastOpStatus = this.lastOpStatusService.getStatusAndClear();
    console.log("ListEmptyFormTypesComponent: lastOpStatus=", this.lastOpStatus);


  }

  getFormTitle(formName) {
    return FormUtil.formTitle(formName);
  }



}
