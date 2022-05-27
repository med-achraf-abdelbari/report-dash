import { createAction, props } from '@ngrx/store';
import { SHARED_ACTION_TYPES } from '../types/types';

export const getSettings = createAction(
  SHARED_ACTION_TYPES.GET_SETTINGS
);

export const getSettingsSuccess = createAction(
    SHARED_ACTION_TYPES.GET_SETTINGS_SUCCESS,
    props<{ data: any }>()
);

export const getSettingsFailure = createAction(
    SHARED_ACTION_TYPES.GET_SETTINGS_FAILED,
    props<{ data: any }>()
);
