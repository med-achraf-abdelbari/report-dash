import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {ManualDataInputComponent} from './manual-data-input/manual-data-input.component';
import {LandingComponent} from './landing/landing.component';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
    {path: 'user-manual-data-input', component: ManualDataInputComponent},
    {path: 'about', component: AboutComponent},
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
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
