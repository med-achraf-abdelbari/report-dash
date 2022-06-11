import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {selectHelpSubmission} from '../../store/selectors/shared.selectors';
import {Store} from '@ngrx/store';
import {getHelpSubmission} from '../../store/actions/shared.actions';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, map} from 'rxjs';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
    selector: 'app-manual-data-input',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit, OnDestroy {

    aboutDetails = null;

    constructor(private store: Store, private domSanitizer: DomSanitizer, private ngxService: NgxUiLoaderService) {
    }

    ngOnInit() {
        this.getAboutDetails();
    }

    getAboutDetails() {
        this.store.select(selectHelpSubmission).pipe(map(data => {
            if (!data) {
                this.ngxService.start('aboutDetails');
            }
            return data;
        })).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.aboutDetails = this.domSanitizer.sanitize(SecurityContext.HTML, data.about);
            this.ngxService.stop('aboutDetails');
        });
        this.store.dispatch(getHelpSubmission());
    }

    ngOnDestroy() {
        console.log('bye');
    }

}
