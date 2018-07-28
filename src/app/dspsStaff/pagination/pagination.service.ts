import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  pageInfoChange = new Subject<{ currentPage: number, pageSize: number }>();

  constructor() { }

  // listeners interested in page info change will subscribe to this
  getPageInfoChangeListener() {
    return this.pageInfoChange.asObservable();
  }

  // the pagination component will call this on a change to its page info
  generatePageInfoChange(pageNum: number, pageSize: number) {
    this.pageInfoChange.next({
      currentPage: pageNum,
      pageSize: pageSize
    });
  }
}
