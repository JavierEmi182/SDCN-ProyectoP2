import { TestBed } from '@angular/core/testing';

import { PaseoService } from './paseo.service';

describe('PaseoService', () => {
  let service: PaseoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaseoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
