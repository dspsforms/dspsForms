import { Component, Input } from '@angular/core';

@Component({
    selector: 'active-link-sr',
    template: `
    <span *ngIf="isActive" 
        class='sr-only'>(current)
    </span>
    `
    
})
export class ActiveLinkSRComponent {

    @Input() isActive;
    
    // add this to the active class
    activeString = "<span class='sr-only'>(current)</span>";    
}