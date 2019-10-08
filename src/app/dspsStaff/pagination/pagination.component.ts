import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Subject } from '../../../../node_modules/rxjs';
import { PaginationService } from './pagination.service';
import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() maxItems: number;
  @Input() pageSize;

  constructor(private paginationService: PaginationService) {}

  // @Output('change') pageChangeEvent = new EventEmitter();


  totalPages: number;
  currentPage: number;

  selectedPageSize; // dummy



  // an array of numbers. each entry has the value of its index, plus 1
  pages;

  // for debugging, [2, 3, 5];

  pageSizeOptions =  [10, 25, 50, 100];
  pageSize2use;

  ngOnChanges(changes: SimpleChanges) {

      // page size
    if (!this.pageSize || this.pageSize <= 0) {
      this.pageSize2use = Constants.DEFAULT_PAGE_SIZE;
    } else {
      this.pageSize2use = this.pageSize;
    }

    // total pages
    if (this.maxItems) {

      // integer division
      this.totalPages = Math.floor(this.maxItems / this.pageSize2use);
      // add 1 if there is a remainder
      if (this.maxItems % this.pageSize2use > 0) {
        this.totalPages += 1;
      }

    } else {
        this.totalPages = 0;
    }

    if (this.totalPages) {
      this.pages = Array(this.totalPages).fill(1).map((x, i) => i);
      console.log(this.pages);
    }

    console.log("(pageSize, pageSize2Use)=", this.pageSize, this.pageSize2use);

    console.log("(currentPage, totalPages, totalItems)= " + this.currentPage
      + "," + this.totalPages + ", " + this.maxItems);

    // initially, the currentPage is the first page (index == 0)
    this.currentPage = 1;

  }

  // pageNum starts with 1.
  navigateTo(pageNum) {
      if (pageNum === this.currentPage || pageNum <= 0 || pageNum > this.totalPages) {
        return;
      } else {
        this.currentPage = pageNum;

        // let anyone listening know
        this.paginationService.generatePageInfoChange(pageNum, this.pageSize2use);

      }
  }

  onPageSizeChange(event) {
    try {
      console.log("onPageSizeChange. event.value=", event.value);
     // console.log("onPageSizeChange. value=", event.target.value);

      // when page *size* changes, set currentPage to 1, instead of this.currentPage
      // let anyone listening know
      this.paginationService.generatePageInfoChange(1, event.value);

    } catch (err) {
      console.log(err);
    }

  }

  onPageSizeFormSubmit(form) {
    console.log("onPageSizeFormSubmit. form=", form);
  }

  compareFn(val1, val2) {
    console.log("in compareFn. (val1, val2)=", val1, val2);
  }

}
