import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';


import { environment } from '../../environments/environment';
import { WrappedForm } from '../model/wrapped-form.model';
import { FormName, FormUtil } from '../model/form.util';
import { SavedForm } from '../model/saved-form.model';
import { UrlConfig } from '../model/url-config';




@Injectable({
  providedIn: 'root'
})
export class FormsService implements OnInit {

  // key == formName. value = WrappedForm[]
  formsMap = {};

  // key == formName, value == Subject
  formsUpdatedMap = {};

  private currentForm: WrappedForm;
  private currentFormUpdated = new Subject<WrappedForm>();

  // for when an agreement is retrieved
  private agreementRetrieved = new Subject<WrappedForm>();

  private formListTypes = []; // collections of forms in the database
  private formListUpdated = new Subject<string[]>();

  private formSaveStatus = new Subject<{ formId: string, message: string, err?: string } > ();

  constructor(private http: HttpClient) {
    // initiaze formsUpdateMap. each entry is a key/value pair
    // key is formNmae. value is a Subject.
    const formNames: string[] = FormName.formNames;
    for (const form of formNames) {
      this.formsUpdatedMap[form] = new Subject<{ items: WrappedForm[]; maxItems: number }>();
    }

  }

  ngOnInit() {


  }

  getCurrentFormUpdatedListener() {
    return this.currentFormUpdated.asObservable();
  }

  getAgreementRetrievedListener() {
    return this.agreementRetrieved.asObservable();
  }

  getFormListUpdatedListener() {
    return this.formListUpdated.asObservable();
  }

  // each formName has a list of forms.
  // return an observable for such a list.
  getFormUpdatedListener(formName: string) {
    const subject: Subject<{ items: WrappedForm[]; maxItems: number }> = this.formsUpdatedMap[formName];
    if (subject) {
      return subject.asObservable();
    } else {
      return null;
    }
  }

  getFormSaveStatusListener() {
    return this.formSaveStatus.asObservable();
  }


  // /api/form/:formName/:_id
  getFormData2(formName: string, _id: string) {

    console.log("no cached form, fetching from server");
    const url = environment.server + '/api/form/' + formName + "/" + _id;
    this.getFormData(url);

  }

  listFormTypes() {
    const url = environment.server + '/api/form/list';
    console.log("fetching url=", url);
    this.http.get<{ message: string; collections: any[] }>(url).subscribe(msgData => {
      console.log(msgData);


      // msgData.collections has the collection names. each is a plural

      this.formListTypes = msgData.collections.map(collectionName => {

        // collection name is in plural format
        const formName = FormUtil.collection2FormName(collectionName);
        return formName;

      });

      // let those listening on it know
      this.formListUpdated.next([...this.formListTypes]);

    }) ;
  }

  // /api/form/:formName
  listForms2(formName: string, itemsPerPage: number, currentPage: number) {

    // verify formName
    if (! FormName.formNames.includes(formName)) {
      console.log("listForms2, unknown formName ", formName);
      return;
    }

    const queryParams = `?pagesize=${itemsPerPage}&page=${currentPage}`;

    // fetch forms from server. TODO add (limit, offset) -- pagination
    const url = environment.server + '/api/form/' + formName + queryParams;
    console.log("fetching url=", url);
    this.http.get<{ message: string; listOfForms: WrappedForm[]; maxItems: number}>(url)
      .subscribe(msgFormData => {
        console.log(msgFormData);

        // convert each elem to (id, elem) and store in a map
        const id2FormData = {};
        msgFormData.listOfForms.map(elem => {
          const wrappedForm = elem as WrappedForm;
          id2FormData[wrappedForm._id ] = wrappedForm;

        });

        // save the list in formsMap
        this.formsMap[formName] = id2FormData; // msgFormData.listOfForms;

        // let anyone listening know that the data has been updated
        const subject: Subject<{ items: WrappedForm[]; maxItems: number } > = this.formsUpdatedMap[formName];
        if (subject) {
          // send a clone of the array so receiver cannot change our copy
          subject.next({ items: [...msgFormData.listOfForms], maxItems: msgFormData.maxItems } );
        } else {
          console.log("no Subject found to send out an update event for formName ", formName);
        }
      });
  }

  saveForm(formData: SavedForm, agreementForForm?: string) {
    // url is like this: "http://localhost:3000/api/form/intakeForm"
    // or http://localhost:3000/api/form/agreement/intakeForm
    // agreements may change over time, but that is not currently a requirement.
    // if we need to support it, the db structure will need to change. the client side path
    // could potentially remain the same
    let url;
    if (!agreementForForm) {
      url = environment.server + "/api/form/" + formData.formName;
    } else {
      url = environment.server + "/api/form/agreement/" + agreementForForm;
    }
    console.log("post to url=", url, ' agreementForForm=', agreementForForm);
    this.http
      .post < { formId: string, message: string, err?: string } > (url, formData)
      .subscribe( response => {
         console.log(response);
         this.formSaveStatus.next({ formId: response.formId, message: response.message });
         // this.router.navigate([nextUrl || "/"]);
      },
      err => {
        console.log(err);
        this.formSaveStatus.next({ formId: null, message: 'an error occured',  err: err });
    });
  }

  // /api/form/agreement/:formName
  getAgreement(formName: string) {

    const url = environment.server + '/api/form/agreement/' + formName;
    console.log("fetching url=", url);
    this.getFormData(url, true);
  }

  private getFormData(url: string, isAgreement?: boolean) {
    console.log("fetching url=", url);
    this.http.get<{ message: string; formData: WrappedForm }>(url)
      .subscribe(msgFormData => {
        console.log(msgFormData);

        this.currentForm = msgFormData.formData;

        // send out an event to those listening for change in currentForm
        if (!isAgreement) {
          this.currentFormUpdated.next(this.currentForm);
        } else {
          this.agreementRetrieved.next(this.currentForm);
        }

      });
  }
}
