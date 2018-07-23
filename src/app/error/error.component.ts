import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

// import { Subscription } from 'rxjs';
// import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  // styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }

  /*
  data: { message: string };
  private errorSub: Subscription;

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorSub = this.errorService.getErrorListener().subscribe(message => {
      this.data = { message: message };
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
  */

}
