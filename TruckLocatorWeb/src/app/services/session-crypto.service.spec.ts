import { TestBed } from '@angular/core/testing';

import { SessionCryptoService } from './session-crypto.service';

describe('SessionCryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionCryptoService = TestBed.get(SessionCryptoService);
    expect(service).toBeTruthy();
  });
});
