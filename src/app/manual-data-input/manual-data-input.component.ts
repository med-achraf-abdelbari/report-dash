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
            this.report = {...this.report, ...data};
        }
    }

    updateMarketing(data: any) {
        if (!!data) {
            this.report = {...this.report, ...data};
        }
    }

    updateInnovation(data: any) {
        if (!!data) {
            this.report = {...this.report, ...data};
        }
    }

}
