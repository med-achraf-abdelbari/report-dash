import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiIntegrationService} from '../shared/services/api-integration/api-integration.service';
import {SettingsService} from '../shared/services/settings/settings.service';

@Component({
    selector: 'app-manual-data-input', templateUrl: './manual-data-input.component.html', styleUrls: ['./manual-data-input.component.scss']
})

export class ManualDataInputComponent implements OnInit {

    activeSection: 'FIANANCE' | 'MARKETING' | 'INNOVATION' = 'FIANANCE';
    report = {};
    dealReport;
    deepReport:any = {};

    constructor(private route: ActivatedRoute,
                private router: Router,
                private apiIntegrationService: ApiIntegrationService,
                private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            if (params.gm || params.code) {
                this.getMetrics(params);
            }
        });
        this.getCompanyCurrency();
    }

    getCompanyCurrency() {
        this.settingsService.getCompanyCurrency().subscribe(companyReport => {
            this.dealReport = companyReport;
        });
    }

    getMetrics(parms) {
        const requestParams = {
            integrationName: localStorage.getItem('selectedProvider'),
            companyName: localStorage.getItem('permalink'),
        };
        if (!!parms.code) {
            requestParams['options'] = {
                callbackUrl: this.router.url
            };
        }
        this.apiIntegrationService.calculateMatrics(requestParams).subscribe((result: any) => {
            if (result.type === 'auth-url') {
                window.location.href = result.data.url;
            }
        });
    }

    updateFinance(data: any) {
        if (!!data) {
            this.report = {...this.report, financials: {...data}};
        }
        console.log(this.report);
    }

    updateMarketing(data: any) {
        if (!!data) {
            this.report = {...this.report, marketing: {...data}};
        }
        console.log(this.report);
    }

    updateInnovation(data: any) {
        if (!!data) {
            this.report = {...this.report, innovation: {...data}};
        }
        console.log(this.report);
    }

    submitReport() {
        this.settingsService.submitDeepReport(localStorage.getItem('cid'), this.deepReport).then(result =>{console.log(result)})
    }

    setFinancialReportData(data) {
        this.deepReport.financials = {...this.deepReport.financials , ...data};
    }

    showConfirmModal() {

    }

}
