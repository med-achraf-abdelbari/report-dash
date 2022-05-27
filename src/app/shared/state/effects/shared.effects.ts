import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getSettings, getSettingsFailure, getSettingsSuccess} from '../actions/shared.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {SettingsService} from '../../services/settings/settings.service';

@Injectable()
export class SharedEffects {
    getSettings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getSettings),
            exhaustMap((action: any) =>
                this.settingsService
                    .getSettings()
                    .pipe(
                        map((response: any) => {
                            debugger;
                            return getSettingsSuccess({data: response});
                        }),
                        catchError(error => {
                            return of(getSettingsFailure(error));
                        })
                    )
            )
        )
    );

    constructor(private actions$: Actions,
                private settingsService: SettingsService) {
    }
}
