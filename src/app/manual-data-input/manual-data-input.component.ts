import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-manual-data-input',
    templateUrl: './manual-data-input.component.html',
    styleUrls: ['./manual-data-input.component.scss']
})

export class ManualDataInputComponent implements OnInit {

    financialYears = [new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3];
    shareHolders: FormGroup[] = [
        this.formBuilder.group({
            name: [],
            stake: [],
            shares: [],
            shareClass: [],
            voting: [],
            antiDilution: [],
            allocationDate: [],
        })
    ];
    previousCash: FormGroup[] = [
        this.formBuilder.group({
            type: [],
            cap: [],
            discount: [],
            source: [],
            date: [],
            amount: [],
            equityGiven: [],
            charges: []
        })
    ];

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

    addShareHolder() {
        this.shareHolders.push(this.createShareholder());
    }

    createShareholder(): FormGroup {
        return this.formBuilder.group({
            name: [],
            stake: [],
            shares: [],
            shareClass: [],
            voting: [],
            antiDilution: [],
            allocationDate: [],
        });
    }

    createPreviousCash() {
        this.previousCash.push(
            this.formBuilder.group({
                type: [],
                cap: [],
                discount: [],
                source: [],
                date: [],
                amount: [],
                equityGiven: [],
                charges: []
            })
        );
    }

}
