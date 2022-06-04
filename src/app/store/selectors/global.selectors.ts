import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GlobalState} from '../reducers/globalReducer';
import {mainFeatureKey} from '../types/types';

export const globalState = createFeatureSelector<GlobalState>(mainFeatureKey);

export const selectPuidDetails = createSelector(
    globalState,
    (state: GlobalState) => state?.puidDetails
);
