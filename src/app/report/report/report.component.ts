import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, ChartComponent} from 'ng-apexcharts';
import {FINANCIAL_METRIC_LIST} from './metric-list';
import {Config, DefaultConfig} from 'ngx-easy-table';
import {SettingsService} from '../../shared/services/settings/settings.service';

export interface ChartOptions {
    series: ApexAxisChartSeries | any;
    chart: ApexChart | any;
    xaxis: ApexXAxis | any;
    title: ApexTitleSubtitle | any;
}


@Component({
    selector: 'app-report', templateUrl: './report.component.html', styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    @ViewChild('chart') chart: ChartComponent;
    metrics: any[] = [];
    configuration: Config;
    columns = [{key: 'title', title: 'title'}, {key: 'value', title: 'value'}];
    data: any[] = [];
    report;
    show;

    constructor(private settingsService: SettingsService, private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.metrics = [...FINANCIAL_METRIC_LIST];
        this.configuration = {...DefaultConfig, headerEnabled: true, paginationEnabled: false, searchEnabled: false};
        this.getReport();
    }

    getReport() {
        this.settingsService.getCompanyCurrency().subscribe((companyReport: any) => {
            this.report = JSON.parse(JSON.stringify(companyReport.report));
            console.log(this.report);
            this.calculateMetricsFromAttributes();
            this.initChartsValues();
        });
    }

    initChartsValues() {
        this.metrics[0].MetricObj.series[0].data = [...Object.values(this.report.deepReport.financials.annualRecurringRevenue)];
        this.metrics[0].MetricObj.series[1].data = [...Object.values(this.report.deepReport.financials.YearOnYearRevenueGrowthRate)];
        this.metrics[2].MetricObj.series[0].data = [...Object.values(this.report.deepReport.financials.marketGrowth)];

        // WIDGET 5
        this.metrics[5].MetricObj.columns[0].value = this.report.deepReport.financials.cashAndCashEquivalent;
        this.metrics[5].MetricObj.columns[1].value = this.report.deepReport.financials.netCash.CashEquiv - this.report.deepReport.financials.netCash.CurrentLiabilities;
        this.metrics[5].MetricObj.columns[2].value = (Object.values(this.report.deepReport.financials.monthlyBurnRate).reduce((a: number, b: number) => a + b , 0) as number)  / 4;
        this.metrics[5].MetricObj.columns[3].value = this.report.deepReport.financials.netBurnRate.SalesLastThreeMonths - (this.report.deepReport.financials.netBurnRate.COGSLastThreeMonths +
            this.report.deepReport.financials.netBurnRate.OperatingCostsLastThreeMonths);
        this.metrics[5].MetricObj.columns[4].value = (this.report.deepReport.financials.runway.CashAndCashEquivalent / this.report.deepReport.financials.runway.NetBurnRate);

    }

    calculateMetricsFromAttributes() {
        this.settingsService.calculateMetricsFromAttributes(this.report.deepReport.financials).subscribe((data) => {
            console.log(data);
        });
    }

    addChartData(name: string, data: any[]) {

    }
}
