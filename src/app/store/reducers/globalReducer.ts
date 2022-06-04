import {Action, createReducer, on} from '@ngrx/store';
import {getPuidDetailsSuccess, setActiveInvitaionSuccess} from '../actions/global.actions';

export interface GlobalState {
    puidDetails: any;
    activeInvitation: any;
}

export const initialState: GlobalState = {
    puidDetails: null,
    activeInvitation: null
};

export const _globalReducer = createReducer(
    initialState,
    on(setActiveInvitaionSuccess, (state, action) => ({
        ...state,
        activeInvitation: action.data,
    })),
    on(getPuidDetailsSuccess, (state, action) => ({
        ...state,
        puidDetails: action.data,
    })),
);
export const globalReducer = (state: GlobalState, action: Action) => {
    return _globalReducer(state, action);
};
