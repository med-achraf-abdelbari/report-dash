import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiIntegrationService} from '../shared/services/api-integration/api-integration.service';
import {SettingsService} from '../shared/services/settings/settings.service';

@Component({
    selector: 'app-manual-data-input', templateUrl: './manual-data-input.component.html', styleUrls: ['./manual-data-input.component.scss']
})

export class ManualDataInputComponent implements OnInit {

    activeSection: 'FIANANCE' | 'MARKETING' | 'INNOVATION' = 'FIANANCE';
    report = {};
    dealReport;

    constructor(private route: ActivatedRoute,
                private apiIntegrationService: ApiIntegrationService,
                private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            console.log(params);
            this.getMetrics(params);
        });
        this.getCompanyCurrency();
    }

    getCompanyCurrency() {
        this.settingsService.getCompanyCurrency().subscribe(companyReport =>{
            this.dealReport = companyReport;
        });
    }

    getMetrics(parms) {
        this.apiIntegrationService.calculateMatrics({
            integrationName: 'Xero', companyName: 'test', options: {
                callbackUrl: 'http://localhost:4000/xeroCallback?code=W5Fsmo7vdjE39h6qdbEX7dMvCFwK8WtWwxv71w6h6_M&scope=openid%20profile%20email%20accounting.transactions%20accounting.settings%20accounting.reports.read%20accounting.contacts%20accounting.attachments%20files%20offline_access&session_state=5uHro-www4e5bZODShnHJpkirYaIqckxSxtafhCUKME.jxk8PepBHpHZQiesyAmtGA'
            }
        }).subscribe((result: any) => {
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

    }

    showConfirmModal() {

    }

}
