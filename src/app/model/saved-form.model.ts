export class SavedForm {

    formName?: string;
    user?: string;
    form?: {};
    edited?: boolean;
    created?: Object;
    lastMod?: Object;

    constructor(options: {
        formName?: string,
        user?: string,
        form?: { },
        edited?: boolean,
        created?: Object,
        lastMod?: Object;
    }) {
        this.formName = options.formName;
        this.user = options.user;
        this.form = options.form || {};
        this.edited = options.edited || false;
        this.created = options.created;
        this.lastMod = options.lastMod ;
    }

}
