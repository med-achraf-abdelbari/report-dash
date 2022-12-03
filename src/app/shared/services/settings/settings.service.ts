import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {Observable, of, Subject} from 'rxjs';
import {log} from 'util';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {INTEGRATION_BACKEND_ENDPOINTS} from '../../../core/endpoints/endpoints';

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
    constructor(private httpClient: HttpClient) {
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

    getCompanyCurrency(id: string) {
        const result = new Subject();
         Parse.Cloud.run('report' , { id }).then((companyReport: any) => {
             result.next(companyReport);
        });
        return result;
    }

    calculateMetricsFromAttributes(attributes) {
        let formattedAttributes = [];
        for (const metric in attributes) {
            formattedAttributes = [...formattedAttributes , ...Object.entries(attributes[metric]).map((elem: any[]) => {
                return { name : elem[0] , value : elem[1] || 0};
            })];
        }
        return this.httpClient.post(`${environment.integrationBackend}${INTEGRATION_BACKEND_ENDPOINTS.CALCULATE_METRICS_FROM_ATTRIBUTES.URI}`, {
            attributes : formattedAttributes
        });
    }

    submitDeepReport(companyId: string , deepReport: any) {
        return Parse.Cloud.run('submitDeepReport', {
            companyId: companyId,
            data: deepReport,
        });
    }
}
