import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SettingsService} from '../../../shared/services/settings/settings.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-modal-content',
    template: `
		<div class="modal-header">
			<h4 class="modal-title">Help</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p [innerHTML]="innerHtml"></p>
		</div>
	`,
})
export class NgbdModalContent {
    @Input() name;
    @Input() innerHtml;

    constructor(public activeModal: NgbActiveModal) {}
}

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
    helpDeepDive = {};

    constructor(private formBuilder: FormBuilder,
                private settingsService: SettingsService,
                private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        this.financialGroup = this.createFinancialControlGorup();
        this.salesFG = (this.financialGroup.get('financial').get('sales') as FormGroup);
        this.financialGroup.valueChanges.subscribe(() => {
            console.log(this.financialGroup.value);
            this.value.emit(this.financialGroup.value);
        });
        this.getHelpDeepDive();
    }

    getHelpDeepDive() {
        this.settingsService.getHelpDeepDive().subscribe((data: any) => {
            this.helpDeepDive = data?.attributes?.moduleFinancials;
        });
    }

    openHintModal(hintType: string) {
        const modalRef = this.modalService.open(NgbdModalContent , {
            centered : true,
            backdrop : true,
            size : 'xl'
        });
        modalRef.componentInstance.innerHtml = this.helpDeepDive[hintType];
    }

    addShareHolder() {
        (this.financialGroup.get('shareholders') as FormArray).controls.push(this.createShareholder());
    }

    createShareholder(): FormGroup {
        return this.formBuilder.group({
            type: new FormControl('', []),
            name: new FormControl('', []),
            stake: new FormControl('', []),
            shares: new FormControl('', []),
            shareClass: new FormControl('', []),
            voting: new FormControl('', []),
            antiDilution: new FormControl('', []),
            allocationDate: new FormControl('', [])
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
            employeeShares: new FormControl('', []),
            accountingMethod: new FormControl('', []),

        });
    }


}
