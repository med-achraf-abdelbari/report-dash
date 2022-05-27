import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {environment} from '../../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ParseHttpClientService {

    constructor() {
      this.init();
    }

    init(): void {
        (Parse as any).serverURL = environment.parse.serverURL;
        Parse.initialize(environment.parse.appId , environment.parse.javascriptKey);
    }
}
