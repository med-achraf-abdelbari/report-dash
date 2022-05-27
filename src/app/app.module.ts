import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {AppComponent} from './app.component';
import {SignupComponent} from './signup/signup.component';
import {LandingComponent} from './landing/landing.component';
import {ManualDataInputComponent} from './manual-data-input/manual-data-input.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {HomeModule} from './home/home.module';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {StoreModule} from '@ngrx/store';
import {sharedReducer} from './shared/state/reducers/shared.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {SharedEffects} from './shared/state/effects/shared.effects';

@NgModule({
  // tslint:disable-next-line:max-line-length
    declarations: [AppComponent, SignupComponent, LandingComponent, ManualDataInputComponent, NavbarComponent, FooterComponent, LoginComponent, AboutComponent],
    imports: [
        BrowserModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        HomeModule,
        StoreModule.forRoot(sharedReducer),
        EffectsModule.forRoot([SharedEffects]),
        StoreDevtoolsModule.instrument({
        name: 'drisk.it',
        maxAge: 25,
        logOnly: environment.production,
    })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
