import { TestBed } from '@angular/core/testing';

import { ArealocationService } from './arealocation.service';

describe('ArealocationService', () => {
  let service: ArealocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArealocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
