

export class WrappedForm {

  formKey?: string;
  _id?: string;
  state?: string;
  form?: any;
  formName?: string;

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
