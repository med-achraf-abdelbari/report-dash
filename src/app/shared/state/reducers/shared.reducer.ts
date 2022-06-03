import {Action, createReducer, on} from '@ngrx/store';
import {getHelpSubmissionSuccess, getSettings, getSettingsSuccess} from '../actions/shared.actions';
import {ISettings} from '../../services/settings/settings.service';

export interface SharedState {
    settings: ISettings;
    helpSubmission: any;
}

export const initialState: SharedState = {
    settings: null,
    helpSubmission : null
};

export const _sharedReducer = createReducer(
    initialState,
    on(getSettingsSuccess, (state, action) => ({
        ...state,
        settings: action.data,
    })),
    on(getHelpSubmissionSuccess, (state, action) => ({
        ...state,
        helpSubmission: action.data,
    })),
);
export const sharedReducer = (state: SharedState, action: Action) => {
    return _sharedReducer(state, action);
};
