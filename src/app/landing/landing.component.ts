import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {filter, Subscription} from 'rxjs';
import {selectPuidDetails} from '../store/selectors/global.selectors';
import {getPuidDetails} from '../store/actions/global.actions';
import {ApiIntegrationService} from '../shared/services/api-integration/api-integration.service';
import {SettingsService} from '../shared/services/settings/settings.service';
import {AutoUnsububscribe} from '../shared/decorators/AutoUnsubscribe';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@AutoUnsububscribe() @Component({
    selector: 'app-landing', templateUrl: './landing.component.html', styleUrls: ['./landing.component.scss']
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
                private router: Router,
                private route: ActivatedRoute,
                private domSanitizer: DomSanitizer,
                private ngxUiLoaderService: NgxUiLoaderService,
                private settingsService: SettingsService,
                private apiIntegrationService: ApiIntegrationService) {
    }

    ngOnInit() {
        this.getPuidDetails();
        this.getHelpDeepDive();
        this.route.queryParams.subscribe((params => {
            for (const param in params) {
                console.log(params);
                localStorage.setItem(param, params[param]);
            }
        }));
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
        localStorage.setItem('selectedProvider', provider);
        this.metricsSubscription = this.apiIntegrationService.calculateMatrics({
            integrationName: provider, companyName: localStorage.getItem('permalink'),
        }).subscribe((result: any) => {
            if (result.type === 'auth-url') {
                window.location.href = result.data.url;
            }
            if (result.type === 'metrics') {
                this.router.navigate(['/user-manual-data-input'], {
                    queryParams: {
                        gm: true // get metrics
                    }
                });
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
