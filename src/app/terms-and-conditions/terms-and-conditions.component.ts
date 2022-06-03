import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {selectSettings} from '../shared/state/selectors/shared.selectors';
import {filter} from 'rxjs';
import {getSettings} from '../shared/state/actions/shared.actions';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {

    termsAndConditions = null;

    constructor(private store: Store, private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.getTermsAndConditions();
    }

    getTermsAndConditions() {
        this.store.select(selectSettings).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.termsAndConditions = this.domSanitizer.sanitize(SecurityContext.HTML, data.termsAndConditions);
        });
        this.store.dispatch(getSettings());
    }

    ngOnDestroy() {
        console.log('bye');
    }

}
