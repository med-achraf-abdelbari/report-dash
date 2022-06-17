import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-manual-data-input',
    templateUrl: './manual-data-input.component.html',
    styleUrls: ['./manual-data-input.component.scss']
})

export class ManualDataInputComponent implements OnInit {

    activeSection: 'FIANANCE' | 'MARKETING' | 'INNOVATION' = 'FIANANCE';
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
    private evidences: any;
    private financialGroup: FormGroup;
    private innovationGroup: FormGroup;
    private marketingGroup: FormGroup;
    private ipAssets: any;

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


    createFormControls() {
        this.financialGroup = this.createFinancialControlGorup();
        this.innovationGroup = this.createInnovationControlGroup();
        this.marketingGroup = this.createMarketingControlGroup();

        console.log('financialGroup created ', this.financialGroup.value);
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

    createInnovationControlGroup(): FormGroup {

        // Create evidence controls
        const evidenceControls = {};
        this.evidences.forEach(ev => {
            evidenceControls[ev.name] = {
                value: null,
                notes: null
            };
        });

        return this.formBuilder.group({

            stageOfInnovation: [],
            technologyReadiness: [],
            innovationEvidence: this.formBuilder.group(evidenceControls),

            areaOfImpact: this.formBuilder.group({
                question1: [],
                question2: [],
                question3: [],
                question4: [],
                question5: [],
                question6: [],
                question7: [],
                question8: [],
                question9: [],

                // ... add as many as required for the questions
            }),

            innovationAndIP: this.formBuilder.group({
                assetsGenerated: new FormArray(
                    this.ipAssets.assetsGenerated.controls.map(c => new FormControl(c.value))
                ),
                assetsOwned: new FormArray(
                    this.ipAssets.assetsOwned.controls.map(c => new FormControl(c.value))
                ),
                patentSearches: [],
                patentsApplied: new FormArray(
                    this.ipAssets.patentsApplied.constrols.map(c => new FormControl(c.value))
                ),
                patentsPending: new FormArray(
                    this.ipAssets.patentsPending.constrols.map(c => new FormControl(c.value))
                ),
                patentsGranted: new FormArray(
                    this.ipAssets.patentsGranted.constrols.map(c => new FormControl(c.value))
                ),
            }),

            design: this.formBuilder.group({
                scoping: [],
                brief: [],
                concept: [],
                design: [],
                product: [],
                launch: [],
            }),

            notes: [],

        });
    }

    createMarketingControlGroup(): FormGroup {
        return this.formBuilder.group({
            product: this.formBuilder.group({
                question1: [],
                question2: [],
                answer21: [],
                answer22: [],
                answer23: [],
                answer24: [],
                answer25: [],
                answer26: [],
                answer27: [],
                question3: [],
                question4: [],
                answer41: [],
                answer42: [],
                answer43: [],
                answer44: [],
                answer45: [],
                answer46: [],
                answer47: [],
                answer48: [],
                answer49: [],
                answer410: [],
                answer411: [],
                answer412: [],
                answer413: [],
                answer414: [],
                answer415: [],
                answer416: [],
                answer417: [],
                answer418: [],
                answer419: [],
                answer420: [],
                answer421: [],
                answer422: [],
                answer423: [],
                question5: [],

                // ... add as many as required for the questions
            }),

            performance: this.formBuilder.array([
                this.formBuilder.group({
                    question: [],
                    answer: []
                })
                // uniqueUsers: [],
                // registrations: [],
                // downloads: [],
                // dau: [],
                // mau: [],
                // units: [],
                // conversionRate: [],
                // churnRate: [],
                // retantionRate: [],
                // newUsers: [],
                // cpa: [],
                // cac: [],
                // ltv: [],
                // arpu: [],
            ]),

            socialMedia: this.formBuilder.array([
                this.formBuilder.group({
                    account: [],
                    id: []
                })
                // facebook: [],
                // twitter: [],
                // instagram: [],
                // ... continue with all the rest in the spreadsheet
            ]),

            customerDetails: this.formBuilder.group({
                tam: [],
                sam: [],
                som: [],
                primaryCustomer: []
            }),

            notes: []

        });
    }
}
