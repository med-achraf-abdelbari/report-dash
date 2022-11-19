import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, Subscription} from 'rxjs';
import {selectPuidDetails} from '../store/selectors/global.selectors';
import {getPuidDetails} from '../store/actions/global.actions';
import {ApiIntegrationService} from '../shared/services/api-integration/api-integration.service';
import {SettingsService} from '../shared/services/settings/settings.service';
import {AutoUnsububscribe} from '../shared/decorators/AutoUnsubscribe';

@AutoUnsububscribe()
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
    focus: any;
    focus1: any;
    puidDetails = null;
    helpDeepDive = {};

    puidDetailsSubscription: Subscription;
    helpDeepDiveSubscription: Subscription;
    metricsSubscription: Subscription;

    constructor(private store: Store,
                private domSanitizer: DomSanitizer,
                private settingsService: SettingsService,
                private apiIntegrationService: ApiIntegrationService) {
    }

    ngOnInit() {
        this.getPuidDetails();
        this.getHelpDeepDive();
    }

    getPuidDetails() {
        this.puidDetailsSubscription = this.store.select(selectPuidDetails).pipe(filter(help => !!help)).subscribe(puidDetails => {
            this.puidDetails = puidDetails;
        });
        this.store.dispatch(getPuidDetails({
            data: {
                permalink: localStorage.getItem('permalink')
            }
        }));
    }

    connectWithProvider(provider: string) {
        this.metricsSubscription = this.apiIntegrationService.calculateMatrics({
            integrationName: provider,
            companyName: 'test',
        }).subscribe((result: any) => {
            if (result.type === 'auth-url') {
                window.location.href = result.data.url;
            }
        });
    }

    getHelpDeepDive() {
        this.helpDeepDiveSubscription = this.settingsService.getHelpDeepDive().subscribe((data: any) => {
            this.helpDeepDive = data.attributes;
        });
    }

    ngOnDestroy() {
    }

}
