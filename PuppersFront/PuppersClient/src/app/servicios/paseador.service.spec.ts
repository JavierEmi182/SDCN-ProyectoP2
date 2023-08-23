import { TestBed } from '@angular/core/testing';

import { PaseadorService } from './paseador.service';

describe('PaseadorService', () => {
  let service: PaseadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaseadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
