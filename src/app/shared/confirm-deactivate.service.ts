import { CanDeactivate } from '@angular/router';
import { IHasChanges } from './has-changes.interface';

export class ConfirmDeactivate implements CanDeactivate<IHasChanges> {
    
    canDeactivate(target: IHasChanges) {
        if (target.hasChanges()) {
            return window.confirm("This page has unsaved data. Are you sure you want to discard those?");
        }
        return true;
    }

}