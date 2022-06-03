import { TestBed } from '@angular/core/testing';

import { HelpSubmissionService } from './help-submission.service';

describe('HelpSubmissionService', () => {
  let service: HelpSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
