import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormUtil, FormName } from '../../../model/form.util';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionUtil } from '../../../shared/subscription-util';
import { LastOperationStatusService } from '../../../service/last-operation-status.service';
import { UrlConfig } from '../../../model/url-config';
import { environment } from '../../../../environments/environment';
import { AuthType } from '../../../auth/auth-type.model';
import { Subscription } from '../../../../../node_modules/rxjs';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-list-empty-form-types',
  templateUrl: './list-empty-form-types.component.html',
  styleUrls: ['./list-empty-form-types.component.css']
})
export class ListEmptyFormTypesComponent implements OnInit, AfterViewInit {

  // display these, in this order
  // which is why, not using keys with FormUtil.formMap
  formNames = FormName.formNames; // ['intakeForm', 'altMediaRequest', 'applicationForServices'];

  newFormAbsolute2 = UrlConfig.NEW_FORM_ABSOLUTE2;

  agreementCreateEdit2 = UrlConfig.AGREEMENT_CREATE_EDIT_ABSOLUTE2;
  agreementView2 = UrlConfig.AGREEMENT_VIEW_ABSOLUTE2;


  server: string; // e.g., http://www.missioncollege.edu:3001 , no slash at end

  auth: AuthType;

  authChange: Subscription;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private lastOpStatusService: LastOperationStatusService, ) { }

  lastOpStatus;

  // static true or false will be needed in angular 8+
  // @ViewChild('positionLastOpStatus', { static: true }) positionLastOpStatus: ElementRef;

  @ViewChild('positionLastOpStatus') positionLastOpStatus: ElementRef;

  ngOnInit() {

    this.server = environment.server;

    // initialize with current auth
    this.auth = this.authService.getAuth();

    // listen to changes
    this.authChange = this.authService.getAuthStatusListener().subscribe(auth => {
      this.auth = auth;
    });

    /*
    if we reach here from another service that has just completed, get its
    status, and clear it (so if this or some other component is loaded again,
    the old status is not shown )
    */
    this.lastOpStatus = this.lastOpStatusService.getStatusAndClear();
    if (this.lastOpStatus && this.positionLastOpStatus) {
      this.positionLastOpStatus.nativeElement.focus();
    }
    console.log("ListEmptyFormTypesComponent: lastOpStatus=", this.lastOpStatus);
    console.log("positionLastOpStatus=", this.positionLastOpStatus);


  }

  ngAfterViewInit() {
    setTimeout(() => {

      if (this.lastOpStatus && this.positionLastOpStatus) {
        this.positionLastOpStatus.nativeElement.focus();
      }
      console.log("ngAfterViewInit: lastOpStatus=", this.lastOpStatus);
      console.log("positionLastOpStatus=", this.positionLastOpStatus);

    }, 1000);


  }

  getFormTitle(formName) {
    return FormUtil.formTitle(formName);
  }

  getAria(formName) {
    // return "DSPS Online Form " + FormUtil.formTitle(formName);
    return FormUtil.formTitle(formName);
  }




}
