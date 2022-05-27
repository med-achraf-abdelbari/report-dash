import { TestBed } from '@angular/core/testing';

import { ParseHttpClientService } from './parse-http-client.service';

describe('ParseHttpClientService', () => {
  let service: ParseHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
