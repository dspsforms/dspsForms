import { Component, OnInit, OnDestroy } from '@angular/core';
import { UrlConfig } from 'src/app/model/url-config';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { SubmitStatus } from '../auth-data.model';

import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SubscriptionUtil } from 'src/app/shared/subscription-util';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from 'src/app/error/error.component';
import { SuccessDialogComponent } from 'src/app/success-dialog/success-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  changePasswordForm: FormGroup;

  submitSub: Subscription;

  busy = false;
  initialized = false;

  // submitStatus: SubmitStatus;

  constructor(
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public titleService: Title) {
      this.initForm();
    }

  initForm() {

    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      newPasswords: new FormGroup({
        password1: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        password2: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
      }, {
        validators: this.isSamePassword
      }),
    });

  }

  ngOnInit() {
    this.initialized = true;
    this.titleService.setTitle("Change Password");
    this.submitSub = this.authService.getChangePasswordListener().subscribe(
      statusData => {
        // remove spinner
        this.busy = false;
        // this.submitStatus = statusData as SubmitStatus;
        if(!statusData.err) {
          // data successfully submitted
          this.showSuccess(statusData); // will navigate out when user clicks ok
        } else {
          this.showError(statusData);
        }
      }
    );
  }

  ngOnDestroy() {
    SubscriptionUtil.unsubscribe(this.submitSub);
  }


  isSamePassword(control: AbstractControl) {
    if (control.get('password1').value === control.get('password2').value) {
      return null;
    } else {
      return { isSamePassword: true };
    }
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get password1() {
    return this.changePasswordForm.get(['newPasswords', 'password1']);
  }


  get password2() {
      return this.changePasswordForm.get(['newPasswords', 'password2']);
  }

  onEnterKeyDown(event) {
    if (!this.changePasswordForm.valid) {
      return;
    }

    this.checkAndUpdatePassword();

  }

  checkAndUpdatePassword() {

    if (!this.changePasswordForm.valid) {
      return;
    }

    // for the spinner
    this.busy = true;

    this.authService.checkAndUpdatePassword(
      this.changePasswordForm.get('oldPassword').value,
      this.changePasswordForm.get(['newPasswords', 'password1']).value
    );

  }

  showSuccess(statusData: SubmitStatus) {
    // this.router.navigateByUrl('/?msg=success');
    // console.log(statusData);
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      data: {
        message: statusData.message,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.router.navigateByUrl('/');
    });
  }

  showError(statusData: SubmitStatus) {
    console.log(statusData);
    this.dialog.open(ErrorComponent, {data: {message: String(statusData.err)}});
  }

  // showSuccess(statusData: SubmitStatus) {
  //   this.actionSheetCtrl.create({
  //     header: statusData.message,
  //     buttons: [{
  //       text: 'Okay',
  //       handler: () => {
  //         this.router.navigateByUrl(UrlConfig.ROOT);
  //       }
  //     }]
  //   }).then(actionSheetElem => {
  //     actionSheetElem.present();
  //   });
  // }

  // showError(statusData : SubmitStatus) {
  //   this.alertCtrl.create({
  //     header: statusData.message,
  //     subHeader: String(statusData.err),
  //     buttons: [{
  //       text: 'Okay',
  //       handler: () => {
  //         // stay on page, i.e., no-op
  //       }
  //     }]
  //   }).then(alertElem => {
  //     alertElem.present();
  //   });
  // }


}
