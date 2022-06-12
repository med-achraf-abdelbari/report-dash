import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {ManualDataInputComponent} from './manual-data-input/manual-data-input.component';
import {NavbarComponent} from './shared/layout/navbar/navbar.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {LoginComponent} from './auth/login/login.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {GlobalEffects} from './store/effects/global-effects.service';
import {globalReducer} from './store/reducers/globalReducer';
import {mainFeatureKey} from './store/types/types';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {lOADER_CONFIG} from './core/config/loader.config';
import { FinancialComponent } from './manual-data-input/components/financial/financial.component';
import { InnovationComponent } from './manual-data-input/components/innovation/innovation.component';
import { MarketingComponent } from './manual-data-input/components/marketing/marketing.component';


@NgModule({
    // tslint:disable-next-line:max-line-length
    declarations: [AppComponent, SignupComponent, LandingComponent, ManualDataInputComponent, NavbarComponent, FooterComponent, LoginComponent, FinancialComponent, InnovationComponent, MarketingComponent],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        NgxSkeletonLoaderModule,
        NgxUiLoaderModule.forRoot(lOADER_CONFIG),
        StoreModule.forRoot({[mainFeatureKey]: globalReducer}),
        EffectsModule.forRoot([GlobalEffects]),
        StoreDevtoolsModule.instrument({
            name: 'driskit',
            maxAge: 25,
            logOnly: environment.production,
        }),
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
