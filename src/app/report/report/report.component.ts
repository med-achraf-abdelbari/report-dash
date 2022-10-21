import {Component, OnInit, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent} from 'ng-apexcharts';
import {FINANCIAL_METRIC_LIST} from './metric-list';
import {Config, DefaultConfig} from 'ngx-easy-table';

export interface ChartOptions {
    series: ApexAxisChartSeries | any;
    chart: ApexChart | any;
    xaxis: ApexXAxis | any;
    title: ApexTitleSubtitle | any;
}


@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    @ViewChild('chart') chart: ChartComponent;
    metrics = FINANCIAL_METRIC_LIST;
    configuration: Config;
    columns = [
        {key: 'title', title: 'title'},
        {key: 'value', title: 'value'}
    ];
    data: any[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.configuration = {...DefaultConfig , headerEnabled : true , paginationEnabled : false , searchEnabled : false};
        this.initChartsValues();
    }

    initChartsValues() {

    }

    addChartData(name: string, data: any[]) {

    }
}
