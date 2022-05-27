import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {Observable, of, Subject} from 'rxjs';

export namespace ISettings {
    export interface MicrositeCardTexts {
        development?: string;
        concept?: string;
        revenue?: string;
    }
}

export interface ISettings {
    contactEmail: string;
    privacyNotice: string;
    video: string;
    termsAndConditions: string;
    micrositeCardTexts?: ISettings.MicrositeCardTexts;
}

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    constructor() {
    }

    getSettings(): Observable<ISettings> {
        const result = new Subject<ISettings>();
        new Parse.Query('Settings').descending('updatedAt').first().then((settings: Parse.Object<ISettings>) => {
            result.next(settings.attributes);
        });
        return result;
    }
}
