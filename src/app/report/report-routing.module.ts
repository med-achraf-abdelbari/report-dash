import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ReportComponent} from './report/report.component';

const routes: Route[] = [
    {
        path: '', component : ReportComponent
    }
];

@NgModule({
    imports : [
        RouterModule.forChild(routes)
    ]
})
export class ReportRoutingModule {

}
