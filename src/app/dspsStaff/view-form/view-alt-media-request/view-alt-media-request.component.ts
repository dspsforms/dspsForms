import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { FormUtil } from '../../../model/form.util';

@Component({
  selector: 'app-view-alt-media-request',
  templateUrl: './view-alt-media-request.component.html',
  styleUrls: ['./view-alt-media-request.component.css']
})
export class ViewAltMediaRequestComponent implements OnInit, OnChanges {

  @Input() wrappedForm;
  @Input() formKey; // not really needed, but just in case

  formTitle;
  date2Use;

  constructor() { }

  ngOnInit() {

    this.formTitle = FormUtil.formTitle(this.wrappedForm.formName);

  }

  // see documentation of DatePipe at https://angular.io/api/common/DatePipe#datepipe
  ngOnChanges(simpleChanges) {
    this.date2Use = new Date(this.wrappedForm.created);
  }

}
