import { TestBed, inject } from '@angular/core/testing';

import { LastOperationStatusService } from './last-operation-status.service';

describe('LastOperationStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastOperationStatusService]
    });
  });

  it('should be created', inject([LastOperationStatusService], (service: LastOperationStatusService) => {
    expect(service).toBeTruthy();
  }));
});
