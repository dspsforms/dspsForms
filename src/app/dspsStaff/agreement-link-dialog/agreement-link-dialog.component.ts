import { Component, OnInit, Input } from '@angular/core';
import { FormsService } from '../../service/forms.service';
import { MatDialog } from '@angular/material';
import { AgreementViewDialogComponent } from '../agreement-view-dialog/agreement-view-dialog.component';

@Component({
  selector: 'app-agreement-link-dialog',
  templateUrl: './agreement-link-dialog.component.html',
  styleUrls: ['./agreement-link-dialog.component.css']
})
export class AgreementLinkDialogComponent implements OnInit {

  @Input() formName;
  constructor(
    public formService: FormsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showTermsDialog() {

    const dialogRef = this.dialog.open(AgreementViewDialogComponent, {
      data: { formName: this.formName, formService: this.formService},
    });

    // user is only reading the agreement. they are not accepting or rejecting
    // the agreement from the dialog view. They will do that by submitting
    // the form (or not). if a value were to be passed back to us, we
    // would use the following code structure.

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }
}
