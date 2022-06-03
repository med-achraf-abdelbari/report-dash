import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SharedState} from '../reducers/shared.reducer';
import {sharedFeatureKey} from '../types/types';

export const sharedState = createFeatureSelector<SharedState>(sharedFeatureKey);
export const selectSettings = createSelector(
    sharedState,
    (state: SharedState) => state?.settings
);

export const selectHelpSubmission = createSelector(
    sharedState,
    (state: SharedState) => state?.helpSubmission
);
