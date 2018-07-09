// import { AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs";

export class WrappedForm {

    formKey?: string;
    // itemRef?: AngularFireObject<any>;
    item?: Observable<any>;
    form?: any;

    constructor(options: {
        formKey?: string,
        // itemRef?: AngularFireObject<any>,
        item?: Observable<any>,
        form?: any,
    })
    {
        this.formKey = options.formKey;
       // this.itemRef = options.itemRef;
        this.form = options.form || {};
        this.item = options.item;
    }

}
