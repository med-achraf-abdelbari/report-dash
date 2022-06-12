import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-innovation',
    templateUrl: './innovation.component.html',
    styleUrls: ['./innovation.component.scss']
})
export class InnovationComponent implements OnInit {


    stages = [
        {
            name: 'Opportunity & Challenges Identified',
            info: 'These include all the initiating factors like a crisis, new evidence, inspirations etc, which highlight the need for change. This might involve diagnosing the root causes of a problem, or identifying the opportunities that a new change could bring about.'
        },
        {
            name: 'Ideas / Solutions Generated',
            info: 'Most of the ideas you come up with at first won’t work. But it’s only through the process of constant idea creation that you arrive at something that is radical and transformative. Use creative methods like design to increase the number of solution options from a wide range of sources.'
        },
        {
            name: 'Developing & Testing',
            info: 'New ideas are always helped by robust criticism. It is through trial and error that ideas are iterated and strengthened. This can be done by simply trying things out, or through more rigorous prototyping and randomised controlled trials.'
        },
        {
            name: 'Making The Case',
            info: 'Before you try to implement your idea, you need to prove that it can work and is better than what is already there. Build up firm evidence to back it up and then share it honestly.'
        },
        {
            name: 'Delivering & Implementing',
            info: 'This is when the solution becomes everyday practice. It includes identifying what is working well, and what is not, as well as securing income streams that enable the long term financial sustainability to carry the innovation forward.'
        },
        {
            name: 'Growing & Scaling',
            info: 'In this stage there are a range of strategies for growing and spreading an innovation – from organisational growth, to licensing and franchising. Emulation and inspiration also play a critical role in spreading an idea or practice in a more organic and adaptive manner.'
        }
    ];

    techLevels = [
        {level: 'T1', desc: 'Basic principles outlined / reported', info: '(This is help file text - AP to provide)'},
        {level: 'T2', desc: 'Technology concept and/or application formulated', info: '(This is help file text - AP to provide)'},
        {level: 'T3', desc: 'Experimental proof-of-concept', info: '(This is help file text - AP to provide)'},
        {level: 'T4', desc: 'Component validation in lab or test environment', info: '(This is help file text - AP to provide)'},
        {
            level: 'T5',
            desc: 'Technology validation (critical function verification) in relevant sector or business environment',
            info: '(This is help file text - AP to provide)'
        },
        {
            level: 'T6',
            desc: 'System/subsystem model or prototype demonstration in a relevant environment',
            info: '(This is help file text - AP to provide)'
        },
        {level: 'T7', desc: 'System prototype demonstration in operational environment', info: '(This is help file text - AP to provide)'},
        {
            level: 'T8',
            desc: 'Actual system completed and \'test qualified\' through test and demonstration',
            info: '(This is help file text - AP to provide)'
        },
        {level: 'T9', desc: 'Actual system \'proven\' in operational envirnment', info: '(This is help file text - AP to provide)'}
    ];

    commercialExplorationQuestions = [
        'Does the proposal represent clear sector advancement or impact?',
        'Does the proposal represent a new operating model or business model?',
        'Is it something that would open us up to new or different customers?',
        'Does the idea expose us to potentially new competitors or different competition?',
        'Would it require new skill sets – do we need to recruit or train people to do it?',
        'Would it require new technologies or types of resources or facilities or whatever that we don’t know how to manage?',
        'Are you undertaking and R&D?',
        '(UK only) Have you applied for any R&D tax credits?',
        ''
    ];

    designs = [
        { name: 'Scoping', control: 'scoping' },
        { name: 'Brief', control: 'brief' },
        { name: 'Concept', control: 'concept' },
        { name: 'Design', control: 'design' },
        { name: 'Production', control: 'product' },
        { name: 'Launch', control: 'launch' }
    ];

    designTypes = ['moodboard', 'storyboard', 'wireframe', 'brief'];

    ipAssets = {
        assetsGenerated: {
            display: 'What assets do you generate?',
            type: 'group',
            controls: [
                { display: 'reports', value: 'reports' },
                { display: 'software code', value: 'code' },
                { display: 'logo', value: 'logo' },
                { display: 'designs', value: 'designs' },
                { display: 'copy', value: 'copy' }
            ]
        },
        assetsOwned: {
            display: 'Have you registered any of the following?',
            type: 'group',
            controls: [
                { display: 'Design', value: 'design' },
                { display: 'Trade', value: 'trade' },
                { display: 'Marks', value: 'marks' },
                { display: 'Patents', value: 'patents' },
                { display: 'Copyright', value: 'copyright' },
            ]
        },
        patentSearches: {
            display: 'Have you (or an agent on your behalf) done any patent searches?',
            type: 'control'
        },
        patentsApplied: {
            display: 'Patents applied for',
            type: 'array',
            constrols: []
        },
        patentsPending: {
            display: 'Patents pending',
            type: 'array',
            constrols: []
        },
        patentsGranted: {
            display: 'Patents granted',
            type: 'array',
            constrols: []
        }
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
