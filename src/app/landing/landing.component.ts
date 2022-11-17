import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {DomSanitizer} from '@angular/platform-browser';
import {filter} from 'rxjs';
import {selectPuidDetails} from '../store/selectors/global.selectors';
import {getPuidDetails} from '../store/actions/global.actions';
import {ApiIntegrationService} from '../shared/services/api-integration/api-integration.service';
import {SettingsService} from '../shared/services/settings/settings.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    focus: any;
    focus1: any;
    puidDetails = null;
    helpDeepDive = {};

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
        this.store.select(selectPuidDetails).pipe(filter(help => !!help)).subscribe((data: any) => {
            this.puidDetails = data;
        });
        this.store.dispatch(getPuidDetails({
            data: {
                permalink: localStorage.getItem('permalink')
            }
        }));
    }

    calculatewith(provider: string) {
        this.apiIntegrationService.calculateMatrics({
            integrationName: provider,
            companyName: 'test',
            options: {
                code : 't6NgFcxPWbOuhLgyfX35dXI0kB2_c7-blYhklZ5lN5Y'
            }
        }).subscribe((result: any) => {
            if (result.type === 'auth-url') {
                window.location.href = result.data.url;
            }
        });
    }

    getHelpDeepDive() {
        this.settingsService.getHelpDeepDive().subscribe((data: any) => {
            this.helpDeepDive = data.attributes;
            console.log(this.helpDeepDive);
        });
    }

}
