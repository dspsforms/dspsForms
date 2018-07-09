import { Component , Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveLinkSRComponent } from './active-link-sr.component';

@Component({
    selector: 'nav-bar',
    templateUrl: "./nav-bar.component.html" ,
    styles: [`
        .own-logo {
            height : 200px;
        }
    `]

})
export class NavBarComponent {

    // @Input() activeClass: string;

    active = '';

    constructor(private _router: Router) { }

    isCurrentlyActive(path) {
        // params: (path, isExact)
        try {
            // console.log("path=", path);
            if (this._router.isActive(path, true)) {
                return true;
            }
            else return false;

        } catch (err) {
            console.log("isCurrentlyActive, path=", path, err);
            return false;
        }

    }

    stopPropagation($event) {
        event.stopPropagation();
    }


}
