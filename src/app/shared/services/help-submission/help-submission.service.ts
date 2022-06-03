import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import * as Parse from 'parse';
import {ISettings} from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class HelpSubmissionService {

  constructor() { }

  getHelpSubmission() {
    const result = new Subject<any>();
    new Parse.Query('HelpSubmission').descending('updatedAt').first().then((helpDetails: Parse.Object<any>) => {
      result.next(helpDetails.attributes);
    });
    return result;
  }
}
