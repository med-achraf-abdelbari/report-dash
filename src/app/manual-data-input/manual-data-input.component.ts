import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-manual-data-input', templateUrl: './manual-data-input.component.html', styleUrls: ['./manual-data-input.component.scss']
})

export class ManualDataInputComponent implements OnInit {

    activeSection: 'FIANANCE' | 'MARKETING' | 'INNOVATION' = 'FIANANCE';
    report = {};

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            console.log(params);
            this.getMetrics(params);
        });
    }

    getMetrics(parms) {

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
