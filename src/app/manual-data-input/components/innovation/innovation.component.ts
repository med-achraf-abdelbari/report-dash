import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NgbdModalContent} from '../financial/financial.component';
import {SettingsService} from '../../../shared/services/settings/settings.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {commercialExplorationQuestions, designs, designTypes, ipAssets, stages, techLevels} from '../../models/innovation';

@Component({
    selector: 'app-innovation',
    templateUrl: './innovation.component.html',
    styleUrls: ['./innovation.component.scss']
})
export class InnovationComponent implements OnInit {

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


    constructor(private formBuilder: FormBuilder,
                private settingsService: SettingsService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.innovationGroup = this.createInnovationControlGroup();
        console.log(this.innovationGroup);
        this.innovationGroup.valueChanges.subscribe((innovationData) => {
            this.value.emit(innovationData);
        });
        this.getHelpDeepDive();
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

        // Create evidence controls
        const evidenceControls = {};
        // this.evidences.forEach(ev => {
        //     evidenceControls[ev.name] = {
        //         value: null,
        //         notes: null
        //     };
        // });

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
                product: [],
                launch: [],
            }),

            notes: [],

        });
    }

}
