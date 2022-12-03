import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Config, DefaultConfig} from 'ngx-easy-table';
import {ChartComponent} from 'ng-apexcharts';
import {innovationData} from '../../../models/innovationReport';

@Component({
    selector: 'app-innovation-report',
    templateUrl: './innovation-report.component.html',
    styleUrls: ['./innovation-report.component.scss']
})
export class InnovationReportComponent implements OnInit {

    @Input() innovationMetrics;
    @ViewChild('chart') chart: ChartComponent;
    assetsGeneratedChartOptions: any;
    registredAssetsChartOptions: any;
    configuration: Config;
    columns = [
        {key: 'title', title: 'title'},
        {key: 'value', title: 'value'}
    ];
    data: any = innovationData;

    constructor() {
    }

    ngOnInit(): void {
        this.configuration = {...DefaultConfig, headerEnabled: false, paginationEnabled: false, searchEnabled: false};
        this.assetsGeneratedChartOptions = {
            series: [
                {
                    data: []
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
        this.registredAssetsChartOptions = {
            series: [
                {
                    data: []
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
        this.prepareInnovationReportData();

    }

    prepareInnovationReportData() {
        if (this.innovationMetrics) {
            this.data.stageOfInnovation[0].value = this.innovationMetrics.deepReport.innovation.stageOfInnovation;
            this.data.trl[0].value = this.innovationMetrics.deepReport.innovation.technologyReadiness;
            Object.values(this.innovationMetrics.deepReport.innovation.areaOfImpact).forEach((elem, num) => {
                this.data.commercialExploitation[num].value = elem;
            });
            Object.entries(this.innovationMetrics.deepReport.innovation.design).forEach(([key, val], num) => {
                this.data.design.map(elem => {
                    if (elem.title.toLowerCase() == key) {
                        elem.value = !!val ? 'Yes' : 'No';
                    }
                    return elem;
                });
                console.log(this.data.design);
            });
            this.innovationMetrics.deepReport.innovation.innovationAndIP.assetsGenerated.forEach(elem => {
                if (!!elem.value) {
                    this.assetsGeneratedChartOptions.series[0].data.push({
                        x: elem.name,
                        y: '1'
                    });
                }
            });
            this.innovationMetrics.deepReport.innovation.innovationAndIP.assetsOwned.forEach(elem => {
                if (!!elem.value) {
                    this.registredAssetsChartOptions.series[0].data.push({
                        x: elem.name,
                        y: '1'
                    });
                }
            });
        }
    }

}
