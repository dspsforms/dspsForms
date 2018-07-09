import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date',
  template: `
        <span [class]="className2Use">{{ label2Use }} {{ date2Use | date:'medium' }}</span>
    ` ,

    styles: [`
        .small {
            font-size: smaller;
        }
    `]
})
export class DateComponent implements OnChanges {

  constructor() { }

  @Input() timestamp;
  @Input() className;
  @Input() label;

  className2Use;
  date2Use;
  label2Use;

  // see documentation of DatePipe at https://angular.io/api/common/DatePipe#datepipe
  ngOnChanges(simpleChanges) {
    this.className2Use = this.className || 'small';
    this.date2Use = new Date(this.timestamp);
    this.label2Use = this.label + " : " || '';
  }

}
