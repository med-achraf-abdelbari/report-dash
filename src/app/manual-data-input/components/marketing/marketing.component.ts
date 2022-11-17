import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbdModalContent} from '../financial/financial.component';
import {SettingsService} from '../../../shared/services/settings/settings.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-marketing',
    templateUrl: './marketing.component.html',
    styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {
    // tslint:disable-next-line:no-output-rename
    @Output('value') value = new EventEmitter<any>();

    markets = [
        {
            title: 'What is the approximate financial size of your TAM?',
            control: 'tam'
        },
        {
            title: 'What is the approximate financial size of your SAM?',
            control: 'sam'
        },
        {
            title: 'What is the approximate financial size of your SOM?',
            control: 'som'
        },
    ];

    marketingPrefrence = [
        this.formBuilder.group({
            name: [],
            stake: []
        })
    ];
    socialPrefrence = [
        this.formBuilder.group({
            name: [],
            stake: []
        })
    ];
    products = [
        {
            name: 'What is the key nature of your USP (Unique Selling Proposition)?',
            getHelp: () => 'this.helpProduct.USP',
            control: 'question1',
            kinds: [
                {title: 'Cheaper'},
                {title: 'Better (higher performance or more/better features)'},
                {title: 'Niche (tailored to a segment of the market)'},
                {title: 'Local version of established product (local language and/or adapted to our country\'s specific needs)'},
                {title: 'New - Others have been trying but nobody doing it successfully yet'},
                {title: 'New - First of its kind in our country (e.g. ride-sharing in Italy before Uber was available in Italy)'},
                {title: 'First of its kind globally'}
            ]
        },
        {
            name: 'Customer interactions',
            getHelp: () => 'this.helpProduct.customerInteractions',
            control: 'question2',
            kinds: [
                {control: 'answer21', title: 'What is the biggest pain you have now in your life/job/business?'},
                {control: 'answer22', title: 'What features would you like to have?'},
                {control: 'answer23', title: 'What do you think of our vision?'},
                {control: 'answer24', title: 'Questions focused on building the relationship?'},
                {control: 'answer25', title: 'Can you tell me about the last time that you experienced that particular problem?'},
                {control: 'answer26', title: 'What\'s not good enough about the solution you\'re currently using?'},
                {control: 'answer27', title: 'If you had a magic wand, what would the remedy or perfect solution look like?'}
            ]
        },
        {
            name: 'How do you sell?',
            getHelp: () => 'this.helpProduct.sales',
            control: 'question3',
            kinds: [
                {title: 'B2B'},
                {title: 'B2C'},
                {title: 'B2B2C'},
                {title: 'Other (put details)'}
            ]
        },
        {
            name: 'How do you make money via any primary revenues?',
            instructions: 'Select any from the following to describe aspects of your business and/or revenue model.',
            getHelp: () => 'this.helpProduct.revenues',
            control: 'question4',
            kinds: [
                {control: 'answer41', title: 'Advertising'},
                {control: 'answer419', title: 'Bricks-&-mortar'},
                {control: 'answer422', title: 'Bookings'},
                {control: 'answer421', title: 'Content'},
                {control: 'answer43', title: 'Direct product / service sales'},
                {control: 'answer416', title: 'Distribution'},
                {control: 'answer420', title: 'eCommerce'},
                {control: 'answer44', title: 'Fee / Commission'},
                {control: 'answer45', title: 'Freemium'},
                {control: 'answer418', title: 'Franchise'},
                {control: 'answer423', title: 'Lead Generation'},
                {control: 'answer46', title: 'Licensing'},
                {control: 'answer47', title: 'Mark-up (Wholessale /Retail)'},
                {control: 'answer414', title: 'Marketplace'},
                {control: 'answer48', title: 'Membership'},
                {control: 'answer415', title: 'Manufactoring'},
                {control: 'answer42', title: 'PAYG'},
                {control: 'answer49', title: 'Renting / Leasing'},
                {control: 'answer417', title: 'Retailing'},
                {control: 'answer413', title: 'SaaS'},
                {control: 'answer410', title: 'Subscription'},
                {control: 'answer411', title: 'Sponsorship'},
                {control: 'answer412', title: 'Third party channel sales (affiliates, partnerships, etc)'},
            ]
        },
        {
            name: 'How would you best describe the \'Business Model\'?',
            getHelp: () => 'this.helpProduct.businessModel',
            control: 'question5',
            kinds: [
                {title: 'Acquire high value customers'},
                {title: 'Offer significant value to customers'},
                {title: 'Deliver products or services with high margins'},
                {title: 'Provide for customer satisfaction'},
                {title: 'Maintain market position'},
                {title: 'Fund the business'}
            ]
        }
    ];
    public help: any;

    marketingGroup: any;
    helpDeepDive = {};


    constructor(private formBuilder: FormBuilder,
                private settingsService: SettingsService,
                private modalService: NgbModal) {
    }

    get helpProduct() {
        return this.help?.moduleProduct && this.help?.moduleProduct?.product || {};
    }

    addMoreMarketingPrefrence() {
        this.marketingGroup.get('performance').controls.push(this.formBuilder.group({
            question: [],
            answer: []
        }));
    }

    addSocialPrefrence() {
        this.marketingGroup.get('socialMedia').controls.push(this.formBuilder.group({
            account: [],
            id: []
        }));
    }

    ngOnInit(): void {
        this.marketingGroup = this.createMarketingControlGroup();
        this.marketingGroup.valueChanges.subscribe(() => {
            this.value.emit(this.marketingGroup.value);
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
