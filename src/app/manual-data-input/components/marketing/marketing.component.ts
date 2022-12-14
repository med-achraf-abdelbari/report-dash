import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
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

    productForm = new FormGroup({
        keyNature: new FormControl(''),
        customerInteraction1: new FormControl([]),
        sellType : new FormControl(''),
        customerInteraction2: new FormControl([]),
        businessModelDescription: new FormControl(''),
      });

      marketingPreferenceForm = new FormGroup({ 
            questions_answers : new FormArray([
                new FormGroup({
                    question : new FormControl(''),
                    answer: new FormControl('')
                })
            ])
            })

       socialMediaAccountForm =   new FormGroup({ 
        socialMediaAccounts : new FormArray([
            new FormGroup({
                socialMedia : new FormControl(''),
                userId: new FormControl('')
            })
        ])
        })    

        customerMarketsForm = new FormGroup({
            tam: new FormControl(''),
            sam: new FormControl(''),
            som : new FormControl(''),
            primaryCustomer: new FormControl(''),
          });

        addtionalNotesForm = new FormGroup({
            notes : new FormControl('')
          })

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
            control: 'keyNature',
            type: 'radio',
            kinds: [
                {control: 'keyNature',checked : false,title: 'Cheaper'},
                {control: 'keyNature',checked : false,title: 'Better (higher performance or more/better features)'},
                {control: 'keyNature',checked : false,title: 'Niche (tailored to a segment of the market)'},
                {control: 'keyNature',checked : false,title: 'Local version of established product (local language and/or adapted to our country\'s specific needs)'},
                {control: 'keyNature',checked : false,title: 'New - Others have been trying but nobody doing it successfully yet'},
                {control: 'keyNature',checked : false,title: 'New - First of its kind in our country (e.g. ride-sharing in Italy before Uber was available in Italy)'},
                {control: 'keyNature',checked : false,title: 'First of its kind globally'}
            ]
        },
        {
            name: 'Customer interactions',
            getHelp: () => 'this.helpProduct.customerInteractions',
            control: 'customerInteraction1',
            type: 'checkbox',
            kinds: [
                {control: 'customerInteraction1',checked : false , title: 'What is the biggest pain you have now in your life/job/business?'},
                {control: 'customerInteraction1',checked : false , title: 'What features would you like to have?'},
                {control: 'customerInteraction1',checked : false , title: 'What do you think of our vision?'},
                {control: 'customerInteraction1',checked : false , title: 'Questions focused on building the relationship?'},
                {control: 'customerInteraction1',checked : false , title: 'Can you tell me about the last time that you experienced that particular problem?'},
                {control: 'customerInteraction1',checked : false , title: 'What\'s not good enough about the solution you\'re currently using?'},
                {control: 'customerInteraction1',checked : false , title: 'If you had a magic wand, what would the remedy or perfect solution look like?'}
            ]
        },
        {
            name: 'How do you sell?',
            getHelp: () => 'this.helpProduct.sales',
            control: 'sellType',
            kinds: [
                {control: 'sellType',title: 'B2B'},
                {control: 'sellType',title: 'B2C'},
                {control: 'sellType',title: 'B2B2C'},
                {control: 'sellType',title: 'Other (put details)'}
            ]
        },
        {
            name: 'How do you make money via any primary revenues?',
            instructions: 'Select any from the following to describe aspects of your business and/or revenue model.',
            getHelp: () => 'this.helpProduct.revenues',
            control: 'customerInteraction2',
            type: 'checkbox',
            kinds: [
                {control: 'customerInteraction2', title: 'Advertising'},
                {control: 'customerInteraction2', title: 'Bricks-&-mortar'},
                {control: 'customerInteraction2', title: 'Bookings'},
                {control: 'customerInteraction2', title: 'Content'},
                {control: 'customerInteraction2', title: 'Direct product / service sales'},
                {control: 'customerInteraction2', title: 'Distribution'},
                {control: 'customerInteraction2', title: 'eCommerce'},
                {control: 'customerInteraction2', title: 'Fee / Commission'},
                {control: 'customerInteraction2', title: 'Freemium'},
                {control: 'customerInteraction2', title: 'Franchise'},
                {control: 'customerInteraction2', title: 'Lead Generation'},
                {control: 'customerInteraction2', title: 'Licensing'},
                {control: 'customerInteraction2', title: 'Mark-up (Wholessale /Retail)'},
                {control: 'customerInteraction2', title: 'Marketplace'},
                {control: 'customerInteraction2', title: 'Membership'},
                {control: 'customerInteraction2', title: 'Manufactoring'},
                {control: 'customerInteraction2', title: 'PAYG'},
                {control: 'customerInteraction2', title: 'Renting / Leasing'},
                {control: 'customerInteraction2', title: 'Retailing'},
                {control: 'customerInteraction2', title: 'SaaS'},
                {control: 'customerInteraction2', title: 'Subscription'},
                {control: 'customerInteraction2', title: 'Sponsorship'},
                {control: 'customerInteraction2', title: 'Third party channel sales (affiliates, partnerships, etc)'},
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
                private modalService: NgbModal
                ) {
    }

    get helpProduct() {
        return this.help?.moduleProduct && this.help?.moduleProduct?.product || {};
    }

    get questionsAndAnswers() {
        return this.marketingPreferenceForm.controls["questions_answers"] as FormArray;
      }
    get socialMediaAccounts() {
        return this.socialMediaAccountForm.controls["socialMediaAccounts"] as FormArray;
      }
    addMoreMarketingPrefrence() {
    const newControl = new FormGroup({
        question: new FormControl,
        answer: new FormControl
      });

      this.questionsAndAnswers.push(newControl)

    }

    addSocialPrefrence() {
        const newControl = new FormGroup({
            socialMedia: new FormControl,
            userId: new FormControl
          });
    
          this.socialMediaAccounts.push(newControl)
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
    selectOption(selectedResponse : any, inputType : string) {

        this.products = this.products.map((item : any)=> {
            if (item?.control === selectedResponse?.control ) {
                 item.kinds.forEach((kind: any) => {
                    if (kind?.title === selectedResponse.title) {
                        kind.checked = !kind?.checked;
                    }
                    return {...kind};
                });
            }
            return {...item}
        })
        

        if(inputType === 'checkbox') {
            let pushedValue = []
            const array = this.products.filter((product: any)=> {
                return product.control === selectedResponse?.control
            });
            if (array?.length > 0 ) {
                array[0]
                .kinds
                .filter((kind: any)=> {
                    return kind.checked
                }).forEach((checkedValue: any)=> {
                    pushedValue.push(checkedValue?.title) 
                })
            }
           
            this.productForm.controls[selectedResponse.control].patchValue([... new Set(pushedValue)]) 
            
        }
    }

}
