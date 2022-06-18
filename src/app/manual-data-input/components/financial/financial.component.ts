import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-financial',
    templateUrl: './financial.component.html',
    styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {

    // tslint:disable-next-line:no-output-rename
    @Output('value') value = new EventEmitter<any>();

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
    financialGroup: any;
    salesFG: any;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.financialGroup = this.createFinancialControlGorup();
        this.salesFG = (this.financialGroup.get('financial').get('sales') as FormGroup);
        this.financialGroup.valueChanges.subscribe(() => {
            this.value.emit(this.financialGroup.value);
        });
    }

    addShareHolder() {
        (this.financialGroup.get('shareholders') as FormArray).controls.push(this.createShareholder());
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
        (this.financialGroup.get('previousCash') as FormArray).controls.push(this.createShareholder());
    }

    createFinancialControlGorup(): FormGroup {

        return this.formBuilder.group({

            financial: this.formBuilder.group({
                sales: this.formBuilder.group({
                    previous: [],
                    current: [],
                    year1: [],
                    year2: [],
                    year3: [],
                    year4: [],
                    year5: [],
                }),
                grossProfit: this.formBuilder.group({
                    previous: [],
                    current: [],
                    year1: [],
                    year2: [],
                    year3: [],
                    year4: [],
                    year5: [],
                }),
                netProfit: this.formBuilder.group({
                    previous: [],
                    current: [],
                    year1: [],
                    year2: [],
                    year3: [],
                    year4: [],
                    year5: [],
                })
            }),

            runway: this.formBuilder.group({
                breakEven: this.formBuilder.group({
                    months: [],
                    from: []
                }),
                burnRateNow: [],
                burnRateAfter: []
            }),

            shareholders: this.formBuilder.array([
                this.createShareholder()
            ]),

            previousCash: this.formBuilder.array([
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
            ]),

            notes: new FormControl(),
            employeeShares: [false],
            accountingMethod: new FormControl(),

        });
    }


}
