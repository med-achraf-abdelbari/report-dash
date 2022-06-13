import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {INTEGRATION_BACKEND_ENDPOINTS} from '../../../core/endpoints/endpoints';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiIntegrationService {

    constructor(private httpClient: HttpClient) {
    }

    calculateMatrics(config: any) {
      // tslint:disable-next-line:max-line-length
        return this.httpClient.post(`${environment.integrationBackend}${INTEGRATION_BACKEND_ENDPOINTS.CALCULATE_METRICS.URI}`, config);
    }
}
