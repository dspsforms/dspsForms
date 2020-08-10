import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit, OnDestroy {

  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogParams: any) { }

  ngOnInit() {
    this.message = this.dialogParams.message;
  }

  ngOnDestroy() {

  }
}
