import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {selectSettings} from '../../store/selectors/shared.selectors';
import {filter, map} from 'rxjs';
import {getSettings} from '../../store/actions/shared.actions';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
    selector: 'app-terms-and-conditions',
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit, OnDestroy {

    termsAndConditions = null;

    constructor(private store: Store, private domSanitizer: DomSanitizer, private ngxService: NgxUiLoaderService) {
    }

    ngOnInit() {
        this.getTermsAndConditions();
    }

    getTermsAndConditions() {
        this.store.select(selectSettings).pipe(map(data => {
            if (!data) {
                this.ngxService.start('termsAndConditions');
            }
            return data;
        })).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.termsAndConditions = this.domSanitizer.sanitize(SecurityContext.HTML, data.termsAndConditions);
            this.ngxService.stop('termsAndConditions');
        });
        this.store.dispatch(getSettings());
    }

    ngOnDestroy() {
        console.log('bye');
    }

}
