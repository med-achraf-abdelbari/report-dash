import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {Observable, of, Subject} from 'rxjs';
import {log} from 'util';

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

    getHelpDeepDive(): Observable<any> {
        const result = new Subject<ISettings>();
        new Parse.Query('HelpDeepDive').descending('createdAt').first().then((settings: any) => {
            result.next(settings);
        });
        return result;
    }

    getPuidDetails(puidId: string): Observable<any> {
        const result = new Subject();
        Parse.Cloud.run('permalink' , {id : puidId}).then(data => result.next(data?.attributes));
        return result;
    }

    getCompanyCurrency() {
        const result = new Subject();
         Parse.Cloud.run('report' , { id : localStorage.getItem('cid')}).then((companyReport: any) => {
             result.next(companyReport);
        });
        return result;
    }
}
