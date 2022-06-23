import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-manual-data-input',
    templateUrl: './manual-data-input.component.html',
    styleUrls: ['./manual-data-input.component.scss']
})

export class ManualDataInputComponent implements OnInit {

    activeSection: 'FIANANCE' | 'MARKETING' | 'INNOVATION' = 'FIANANCE';
    report = {};

    constructor() {
    }

    ngOnInit() {
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
