import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastOperationStatusService {

  static status = '';

  constructor() { }

  // return the current value of status. reset the value to empty
  getStatusAndClear() {

    const val = status;

    console.log("LastOperationStatusService.getStatusAndClear(), before: val=", val);

    if (status) {
      status = '';
    }

    console.log("LastOperationStatusService.getStatusAndClear(), after: val=", val);

    return val;

  }

  setStatus(newStatus) {

    status = newStatus;
    console.log("LastOperationStatusService.setStatus(). status=", status);
  }

}
