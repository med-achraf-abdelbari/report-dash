import {createAction, props} from '@ngrx/store';
import {SHARED_ACTION_TYPES} from '../types/types';

export const getPuidDetails = createAction(
    SHARED_ACTION_TYPES.GET_PUID_DETAILS,
    props<{ data: any }>()
);

export const getPuidDetailsSuccess = createAction(
    SHARED_ACTION_TYPES.GET_PUID_DETAILS_SUCCESS,
    props<{ data: any }>()
);

export const getPuidDetailsFailure = createAction(
    SHARED_ACTION_TYPES.GET_PUID_DETAILS_FAILED,
    props<{ data: any }>()
);

export const setActiveInvitaion = createAction(
    SHARED_ACTION_TYPES.SET_ACTIVE_INVITATION_DETAILS
);

export const setActiveInvitaionSuccess = createAction(
    SHARED_ACTION_TYPES.SET_ACTIVE_INVITATION_DETAILS_SUCCESS,
    props<{ data: any }>()
);

export const setActiveInvitaionFailure = createAction(
    SHARED_ACTION_TYPES.SET_ACTIVE_INVITATION_DETAILS_FAILED,
    props<{ data: any }>()
);
