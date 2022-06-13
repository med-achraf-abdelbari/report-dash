import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs';
import {selectPuidDetails} from '../store/selectors/global.selectors';
import {getPuidDetails} from '../store/actions/global.actions';
import {ApiIntegrationService} from '../shared/services/api-integration/api-integration.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;
    puidDetails = null;

    constructor(private store: Store,
                private domSanitizer: DomSanitizer,
                private apiIntegrationService: ApiIntegrationService) {
    }

    ngOnInit() {
        this.getPuidDetails();
    }

    getPuidDetails() {
        this.store.select(selectPuidDetails).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.puidDetails = data;
        });
        this.store.dispatch(getPuidDetails({
            data: {
                permalink: 'vishal-fund'
            }
        }));
    }

    calculatewith(provider: string) {
        this.apiIntegrationService.calculateMatrics({
            integrationName: provider,
            companyName: 'test'
        }).subscribe((result: any) => {
            if (result.type === 'auth-url') {
               window.location.href = result.data.url;
            }
        });
    }

}
