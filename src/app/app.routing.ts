import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {ManualDataInputComponent} from './manual-data-input/manual-data-input.component';
import {LandingComponent} from './landing/landing.component';

const routes: Routes = [
    {path: 'user-manual-data-input', component: ManualDataInputComponent},
    {path: 'xeroCallback', component: ManualDataInputComponent},
    {path: 'public', loadChildren: () => import('src/app/shared/shared.module').then(m => m.SharedModule)},
    {path: 'report', loadChildren: () => import('src/app/report/report.module').then(m => m.ReportModule)},
    // { path: 'register',           component: SignupComponent },
    {path: 'landing', component: LandingComponent},
    // { path: 'login',          component: LoginComponent },
    {path: '', redirectTo: 'landing', pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
