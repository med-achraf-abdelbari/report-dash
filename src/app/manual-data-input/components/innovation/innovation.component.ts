import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NgbdModalContent} from '../financial/financial.component';
import {SettingsService} from '../../../shared/services/settings/settings.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {commercialExplorationQuestions, designs, designTypes, ipAssets, stages, techLevels} from '../../models/innovation';
import {getCurrencySymbol} from '@angular/common';

@Component({
    selector: 'app-innovation',
    templateUrl: './innovation.component.html',
    styleUrls: ['./innovation.component.scss']
})
export class InnovationComponent implements OnInit, OnChanges {

    @Input() dealReport;
    @Output() value = new EventEmitter<any>();

    innovationGroup: any;
    evidences: any;
    helpDeepDive = {};
    stages = stages;
    techLevels = techLevels;
    commercialExplorationQuestions = commercialExplorationQuestions;
    designs = designs;
    designTypes = designTypes;
    ipAssets = ipAssets;

    getCurrencySymbol = getCurrencySymbol;
    companyCurrency: string;
    innovationModules: any;

    constructor(private formBuilder: FormBuilder,
                private settingsService: SettingsService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.innovationGroup = this.createInnovationControlGroup();
        this.innovationGroup.valueChanges.subscribe((innovationData) => {
            this.value.emit(innovationData);
        });
        this.getHelpDeepDive();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.companyCurrency) {
            this.companyCurrency = this.dealReport?.report?.currency;
            this.innovationModules = this.dealReport?.report?.metadata?.modules?.innovation?.elements;
            console.log('COMPANY CURRENCY ==>', this.companyCurrency);
            console.log('INNOVATION MODULES ==>', this.innovationModules);
        }
    }

    getHelpDeepDive() {
        this.settingsService.getHelpDeepDive().subscribe((data: any) => {
            this.helpDeepDive = data?.attributes?.moduleInnovation;
        });
    }

    openHintModal(hintType: string) {
        const modalRef = this.modalService.open(NgbdModalContent, {
            centered: true,
            backdrop: true,
            size: 'xl'
        });
        modalRef.componentInstance.innerHtml = this.helpDeepDive[hintType];
    }


    createInnovationControlGroup(): FormGroup {
        return this.formBuilder.group({

            stageOfInnovation: [],
            technologyReadiness: [],

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
            }),

            innovationAndIP: this.formBuilder.group({
                assetsGenerated: new FormArray(this.ipAssets.assetsGenerated.controls.map(c => new FormGroup({
                    name : new FormControl(c.display),
                    value : new FormControl(false)
                }))),
                assetsOwned: new FormArray(
                    this.ipAssets.assetsOwned.controls.map(c => new FormGroup({
                        name : new FormControl(c.display),
                        value : new FormControl(false)
                    }))
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
                production: [],
                launch: [],
            }),

            notes: [],

        });
    }

}
