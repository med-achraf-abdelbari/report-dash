import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {sharedFeatureKey} from './store/types/types';
import {sharedReducer} from './store/reducers/shared.reducer';
import {AboutComponent} from './components/about/about.component';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {SharedEffects} from './store/effects/shared.effects';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';

@NgModule({
    declarations: [
        AboutComponent,
        TermsAndConditionsComponent,
        PrivacyPolicyComponent
    ],
    imports: [RouterModule.forChild([
        {
            path: 'about',
            component: AboutComponent
        },
        {
          path: 'terms-and-conditions',
          component: TermsAndConditionsComponent
        },
        {
            path: 'privacy-policy',
            component: PrivacyPolicyComponent
        }
    ]),
        CommonModule,
        StoreModule.forFeature(sharedFeatureKey, sharedReducer),
        EffectsModule.forFeature([SharedEffects]),
    ]
})
export class SharedModule {
    constructor() {
    }
}
