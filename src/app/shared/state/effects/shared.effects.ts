import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
    getHelpSubmission,
    getHelpSubmissionFailure,
    getHelpSubmissionSuccess,
    getSettings,
    getSettingsFailure,
    getSettingsSuccess
} from '../actions/shared.actions';
import {catchError, exhaustMap, map, mergeMap, of} from 'rxjs';
import {ISettings, SettingsService} from '../../services/settings/settings.service';
import {HelpSubmissionService} from '../../services/help-submission/help-submission.service';

@Injectable({
    providedIn : 'root'
})
export class SharedEffects {

    getSettings$ = createEffect(() => this.actions$.pipe(ofType(getSettings), exhaustMap((action: any) => this.settingsService
        .getSettings()
        .pipe(map((response: ISettings) => {
            return getSettingsSuccess({data: response});
        }), catchError(error => {
            return of(getSettingsFailure(error));
        })))));

    // tslint:disable-next-line:max-line-length
    getHelpSubmission$ = createEffect(() => this.actions$.pipe(ofType(getHelpSubmission), mergeMap((action: any) => {
        return this.helpSubmissionService
            .getHelpSubmission()
            .pipe(map((response: any) => {
                return getHelpSubmissionSuccess({data: response});
            }), catchError(error => {
                return of(getHelpSubmissionFailure(error));
            }));
    })));

    constructor(private actions$: Actions, private settingsService: SettingsService, private helpSubmissionService: HelpSubmissionService) {
    }
}
