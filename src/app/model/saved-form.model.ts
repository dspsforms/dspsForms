export class SavedForm {

  formName?: string;
  user?: string;
  form?: {};
  edited?: boolean;
  created?: Object;
  lastMod?: Object;
  captcha?: string;

    constructor(options: {
      formName?: string,
      user?: string,
      form?: { },
      edited?: boolean,
      created?: Object,
      lastMod?: Object;
      captcha?: string;
    }) {
      this.formName = options.formName;
      this.user = options.user;
      this.form = options.form || {};
      this.edited = options.edited || false;
      this.created = options.created;
      this.lastMod = options.lastMod;
      this.captcha = options.captcha;
    }

}
