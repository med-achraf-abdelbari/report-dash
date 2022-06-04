import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getPuidDetails, getPuidDetailsFailure, getPuidDetailsSuccess} from '../actions/global.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {SettingsService} from '../../shared/services/settings/settings.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalEffects {

    getPuidDetails$ = createEffect(() => this.actions$.pipe(ofType(getPuidDetails), exhaustMap((action: any) => this.settingsService
        .getPuidDetails(action.data.permalink)
        .pipe(map((response: any) => {
            return getPuidDetailsSuccess({data: response});
        }), catchError(error => {
            return of(getPuidDetailsFailure(error));
        })))));


    constructor(private actions$: Actions, private settingsService: SettingsService) {
    }
}
