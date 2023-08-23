import { TestBed } from '@angular/core/testing';

import { AuthyGuard } from './authy.guard';

describe('AuthyGuard', () => {
  let guard: AuthyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
