import {Component, OnInit, ViewChild} from '@angular/core';
import {Config, DefaultConfig} from 'ngx-easy-table';
import {ChartComponent} from 'ng-apexcharts';

@Component({
    selector: 'app-innovation-report',
    templateUrl: './innovation-report.component.html',
    styleUrls: ['./innovation-report.component.scss']
})
export class InnovationReportComponent implements OnInit {

    @ViewChild('chart') chart: ChartComponent;
    public innovationIpChartOptions: any;
    public innovationIpRChartOptions: any;

    configuration: Config;
    columns = [
        {key: 'title', title: 'title'},
        {key: 'value', title: 'value'}
    ];
    data: any = {
        stageOfInnovation: [
            {
                title: 'Opportunity & Challenges Identified',
                value: 'Yes'
            }
        ],

        trl: [
            {
                title: 'Technology Readiness Level',
                value: 'Level goes here'
            }
        ],

        commercialExploitation: [
            {
                title: 'Does the proposal represent a new operating model or business model?',
                value: 'Yes'
            }, {
                title: 'Is it something that would open us up to new or different customers?',
                value: 'Yes'
            }, {
                title: 'Would it require new skill sets - do we need to recruit or train people to do it?',
                value: 'Yes'
            }, {
                title: 'Are you undertaking and R&D?',
                value: 'Yes'
            }, {
                title: 'Where is your company’s innovation culture on the ‘Innovation Curve?’',
                value: 'Yes'
            }, {
                title: 'Does the proposal represent a new operating model or business model?',
                value: 'Yes'
            }, {
                title: 'Does the idea expose us to potentially competitors or different competition',
                value: 'Yes'
            }, {
                title: 'Would it require new tech or types of resources or facilities or whatever that we don’t know how to manage?',
                value: 'Yes'
            }, {
                title: '(UK only) Have you applied for any R&D tax credits?',
                value: 'Yes'
            },
        ],

        innovationIP: [
            {
                title: 'Opportunity & Challenges Identified',
                value: 'Yes'
            }
        ],
        design: [
            {
                title: 'Scoping',
                value: 'Yes'
            }, {
                title: 'Brief',
                value: 'Yes'
            }, {
                title: 'Concept',
                value: 'Yes'
            }, {
                title: 'Design',
                value: 'Yes'
            }, {
                title: 'Production',
                value: 'Yes'
            }, {
                title: 'Launch',
                value: 'Yes'
            },
        ],
    };

    constructor() {
    }

    ngOnInit(): void {
        this.configuration = {...DefaultConfig, headerEnabled: false, paginationEnabled: false, searchEnabled: false};
        this.innovationIpChartOptions = {
            series: [
                {
                    data: [
                        {
                            x: 'Reports',
                            y: '1'
                        }, {
                            x: 'Software code',
                            y: '1'
                        }, {
                            x: 'Logo',
                            y: '1'
                        }, {
                            x: 'Designs',
                            y: '1'
                        }, {
                            x: 'Copy',
                            y: '1'
                        },
                    ]
                }
            ],
            colors: ['#486076', '#536a80', '#c9d1d6'],

            chart: {
                height: 120,
                type: 'treemap',
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
            },

            title: {
                text: 'Basic Treemap'
            }
        };
        this.innovationIpRChartOptions = {
            series: [
                {
                    data: [
                        {
                            x: 'Design',
                            y: '1'
                        }, {
                            x: 'Trade marks',
                            y: '1'
                        }, {
                            x: 'Patents',
                            y: '1'
                        }, {
                            x: 'Copyright',
                            y: '1'
                        },
                    ]
                }
            ],
            colors: ['#486076', '#536a80', '#c9d1d6'],

            chart: {
                height: 120,
                type: 'treemap',
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
            },

            title: {
                text: 'Basic Treemap'
            }
        };

    }

}
