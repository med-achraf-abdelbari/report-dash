import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {selectHelpSubmission} from '../shared/state/selectors/shared.selectors';
import {Store} from '@ngrx/store';
import {getHelpSubmission} from '../shared/state/actions/shared.actions';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs';

@Component({
    selector: 'app-manual-data-input',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit, OnDestroy {

    aboutDetails = null;

    constructor(private store: Store, private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.getAboutDetails();
    }

    getAboutDetails() {
        this.store.select(selectHelpSubmission).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.aboutDetails = this.domSanitizer.sanitize(SecurityContext.HTML, data.about);
        });
        this.store.dispatch(getHelpSubmission());
    }

    ngOnDestroy() {
        console.log('bye')
    }

}
