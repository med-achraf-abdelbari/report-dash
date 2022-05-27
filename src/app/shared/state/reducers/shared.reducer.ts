import {Action, createReducer, on} from '@ngrx/store';
import {getSettingsSuccess} from '../actions/shared.actions';
import {ISettings} from '../../services/settings/settings.service';

export interface SharedState {
    settings: ISettings;
}

export const initialState: SharedState = {
    settings: null
};

const _sharedReducer = createReducer(
    initialState,
    on(getSettingsSuccess, (state, action) => ({
        ...state,
        settings: action.data,
    })),
);
export const sharedReducer = (state: SharedState, action: Action) => {
    return _sharedReducer(state, action);
};
