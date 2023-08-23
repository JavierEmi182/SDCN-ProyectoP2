import { TestBed } from '@angular/core/testing';

import { PaseadorGuard } from './paseador.guard';

describe('PaseadorGuard', () => {
  let guard: PaseadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaseadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); 
  });
});
