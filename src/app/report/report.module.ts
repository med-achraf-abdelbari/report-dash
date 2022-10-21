import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import {ReportRoutingModule} from './report-routing.module';
import {NgApexchartsModule} from 'ng-apexcharts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'ngx-easy-table';
import { MarketingReportComponent } from './report/components/marketing-report/marketing-report.component';
import { InnovationReportComponent } from './report/components/innovation-report/innovation-report.component';



@NgModule({
  declarations: [
    ReportComponent,
    MarketingReportComponent,
    InnovationReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    TableModule
  ]
})
export class ReportModule { }
