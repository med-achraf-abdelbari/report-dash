import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {SettingsService} from '../../../shared/services/settings/settings.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {getCurrencySymbol} from '@angular/common';

@Component({
    selector: 'app-modal-content', template: `
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

    constructor(public activeModal: NgbActiveModal) {
    }
}

@Component({
    selector: 'app-financial', templateUrl: './financial.component.html', styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit , OnDestroy , OnChanges {

    @Input() dealReport;
    // tslint:disable-next-line:no-output-rename
    @Output('value') value = new EventEmitter<any>();

    shareHolders: FormGroup[] = [this.formBuilder.group({
        name: [], stake: [], shares: [], shareClass: [], voting: [], antiDilution: [], allocationDate: [],
    })];
    previousCash: FormGroup[] = [this.formBuilder.group({
        type: [], cap: [], discount: [], source: [], date: [], amount: [], equityGiven: [], charges: []
    })];
    financialGroup: any;
    salesFG: any;
    helpDeepDive = {};

    getCurrencySymbol = getCurrencySymbol;
    companyCurrency: string;

    revenueRetentionFG: FormGroup;
    financialPerformanceFG: FormGroup;
    businessPerformanceFG: FormGroup;
    marketGrowthFG: FormGroup;
    marketSizeFG: FormGroup;
    cashOperationFG: FormGroup;
    companyReportingFG: FormGroup;

    constructor(private formBuilder: FormBuilder, private settingsService: SettingsService, private modalService: NgbModal, ) {
    }

    ngOnInit() {
        this.initForms();
        this.financialGroup = this.createFinancialControlGorup();
        this.salesFG = (this.financialGroup.get('financial').get('sales') as FormGroup);
        this.financialGroup.valueChanges.subscribe(() => {
            console.log(this.financialGroup.value);
            this.value.emit(this.financialGroup.value);
        });
        this.getHelpDeepDive();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.companyCurrency) {
            this.companyCurrency = this.dealReport?.report?.currency;
            console.log('COMPANY CURRENCY ==>', this.companyCurrency);
        }
    }

    initForms() {
        this.initRevenueRetentionFG();
        this.initFinancialPerformance();
        this.initBusinessPerformanceFG();
        this.initMarketGrowthFG();
        this.initMarketSizeFG();
        this.initCashOperationFG();
        this.initCompanyReportingFG();
    }

    initRevenueRetentionFG() {
        this.revenueRetentionFG = this.formBuilder.group({
            newRevenue: new FormControl(), retainedRevenue: new FormControl()
        });
    }

    initFinancialPerformance() {
        this.financialPerformanceFG = this.formBuilder.group({
            grossProfit: new FormGroup({
                GPYr1: new FormControl(),
                GPYr2: new FormControl(),
                GPYr3: new FormControl(),
                GPYr4: new FormControl()
            }),
            grossProfitMargin: new FormGroup({
                GPYr1: new FormControl(),
                GPYr2: new FormControl(),
                GPYr3: new FormControl(),
                GPYr4: new FormControl(),
                RevYr1: new FormControl(),
                RevYr2: new FormControl(),
                RevYr3: new FormControl(),
                RevYr4: new FormControl()
            }),
            costOfGoodsSold: new FormGroup({
                COGS: new FormControl(),
                totalSaleLLastFY: new FormControl()
            }),
            totalDebt: new FormControl(),
            promotionToSales: new FormGroup({
                totalSMExp : new FormControl(),
                sales : new FormControl()
            }),
            grossMarginGrowth: new FormGroup({
                GMYr1 : new FormControl(),
                GMYr2 : new FormControl(),
                GMYr3 : new FormControl(),
                GMYr4 : new FormControl(),
            }),
            netProfit: new FormGroup({
                NPYr1 : new FormControl(),
                NPYr2 : new FormControl(),
                NPYr3 : new FormControl(),
                NPYr4 : new FormControl(),
            }),
            netProfitMargin: new FormGroup({
                NPYr1 : new FormControl(),
                NPYr2 : new FormControl(),
                NPYr3 : new FormControl(),
                NPYr4 : new FormControl(),
                RevYr1 : new FormControl(),
                RevYr2 : new FormControl(),
                RevYr3 : new FormControl(),
                RevYr4 : new FormControl(),
            }),
            monthlyRecurringRevenue: new FormControl(),
            turnoverToStaff: new FormGroup({
                turnover : new FormControl(),
                numStaff : new FormControl()
            }),
            compoundAnnualGrowthRate: new FormGroup({
                salesEndValue : new FormControl(),
                salesStartingValue : new FormControl(),
                numOfYears : new FormControl()
            }),
            newRevenuePerMarketingSpend: new FormGroup({
                totalSalesLastFY : new FormControl(),
                totalMarketingLastFY : new FormControl(),
            }),
        });
    }

    initBusinessPerformanceFG() {
        this.businessPerformanceFG = this.formBuilder.group({
            annualRecurringRevenue: new FormGroup({
                RevYr1: new FormControl(),
                RevYr2: new FormControl(),
                RevYr3: new FormControl(),
                RevYr4: new FormControl()
            }),
            YearOnYearRevenueGrowthRate: new FormGroup({
                TotalRevYr1: new FormControl(),
                TotalRevYr2: new FormControl(),
                TotalRevYr3: new FormControl(),
                TotalRevYr4: new FormControl()
            }),
        });
    }

    initMarketGrowthFG() {
        this.marketGrowthFG = this.formBuilder.group({
            marketGrowth: new FormGroup({
                SOMYr1: new FormControl(),
                SOMYr2: new FormControl(),
                SOMYr3: new FormControl(),
                SOMYr4: new FormControl()
            }),
            compoundAnnualGrowthRate: new FormControl(),
        });
    }

    initMarketSizeFG() {
        this.marketSizeFG = this.formBuilder.group({
            marketSize: new FormControl(),
        });
    }

    initCashOperationFG() {
        this.cashOperationFG = this.formBuilder.group({
            cashAndCashEquivalent: new FormControl(),
            monthlyBurnRate: new FormGroup({
                OperatingCostsMonth1 : new FormControl(),
                OperatingCostsMonth2 : new FormControl(),
                OperatingCostsMonth3 : new FormControl(),
                OperatingCostsMonth4 : new FormControl(),
            }),
            netBurnRate: new FormGroup({
                SalesLastThreeMonths : new FormControl(),
                COGSLastThreeMonths : new FormControl(),
                OperatingCostsLastThreeMonths : new FormControl(),
            }),
            netCash: new FormGroup({
                CashEquiv : new FormControl(),
                CurrentLiabilities : new FormControl(),
            }),
            runway: new FormGroup({
                CashAndCashEquivalent : new FormControl(),
                NetBurnRate : new FormControl(),
            }),
            netRevenueRetention: new FormGroup({
                TotalBilledLastMonth : new FormControl(),
                MRRGrowth : new FormControl(),
                RevenueDowngradesOrCancellations : new FormControl(),
            }),
        });
    }

    initCompanyReportingFG() {
        this.companyReportingFG = this.formBuilder.group({
            accountingMethod: new FormControl(),
            companyShares: new FormControl(),
            shareHolders: new FormArray([
                new FormGroup({
                    name : new FormControl(),
                    stake : new FormControl(),
                    shares : new FormControl(),
                    shareClass : new FormControl(),
                    voting : new FormControl(),
                    antiDilution : new FormControl(),
                    date : new FormControl(),
                })
            ]),
            previousFinanceInjection: new FormArray([
                new FormGroup({
                    injectionType : new FormControl(),
                    fundSource : new FormControl(),
                    date : new FormControl(),
                    amount : new FormControl(),
                    equityGiven : new FormControl(),
                    charges : new FormControl(),
                })
            ]),
        });
    }


    getHelpDeepDive() {
        this.settingsService.getHelpDeepDive().subscribe((data: any) => {
            this.helpDeepDive = data?.attributes?.moduleFinancials;
        });
    }

    openHintModal(hintType: string) {
        const modalRef = this.modalService.open(NgbdModalContent, {
            centered: true, backdrop: true, size: 'xl'
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
                    previous: [], current: [], year1: [], year2: [], year3: [], year4: [], year5: [],
                }), grossProfit: this.formBuilder.group({
                    previous: [], current: [], year1: [], year2: [], year3: [], year4: [], year5: [],
                }), netProfit: this.formBuilder.group({
                    previous: [], current: [], year1: [], year2: [], year3: [], year4: [], year5: [],
                })
            }),

            runway: this.formBuilder.group({
                breakEven: this.formBuilder.group({
                    months: [], from: []
                }), burnRateNow: [], burnRateAfter: []
            }),

            shareholders: this.formBuilder.array([this.createShareholder()]),

            previousCash: this.formBuilder.array([this.formBuilder.group({
                type: [], cap: [], discount: [], source: [], date: [], amount: [], equityGiven: [], charges: []
            })]),

            notes: new FormControl(), employeeShares: new FormControl('', []), accountingMethod: new FormControl('', []),

        });
    }

    ngOnDestroy() {
    }

}
