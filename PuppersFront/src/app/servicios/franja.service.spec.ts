import { TestBed } from '@angular/core/testing';

import { FranjaService } from './franja.service';

describe('FranjaService', () => {
  let service: FranjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
