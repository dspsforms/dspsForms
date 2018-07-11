

export class WrappedForm {

  formKey?: string;
  _id?: string;
    form?: any;

  constructor(options: {
        formKey?: string,
        _id?: string,
        form?: any,
    })
    {
      this.formKey = options.formKey;
      this._id = options._id;
      this.form = options.form || {};
    }

}
