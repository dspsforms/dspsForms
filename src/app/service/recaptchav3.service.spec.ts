import { TestBed, inject } from '@angular/core/testing';

import { Recaptchav3Service } from './recaptchav3.service';

describe('Recaptchav3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Recaptchav3Service]
    });
  });

  it('should be created', inject([Recaptchav3Service], (service: Recaptchav3Service) => {
    expect(service).toBeTruthy();
  }));
});
