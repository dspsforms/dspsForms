import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class UrlService {

   // public _server = Environment.JSON_SERVER || 'http://fredevdisc.zapto.org:8080' || 'http://localhost:8080';

    public _server = 'http://localhost:8080'; // 'http://fredevdisc.zapto.org:8080';

    public _loginServer = 'http://localhost:6080'; //  'http://devfred.zapto.org:6080';

    public _action = {

        login: this._loginServer + '/signIn.htm?output=json',
        createBlue: this._server + '/createBlue.htm?form_name=blue_form&student_id=s741&class_id=1&output=json' ,
        logout: this._loginServer + '/signOut.htm?output=json',
    };




}
