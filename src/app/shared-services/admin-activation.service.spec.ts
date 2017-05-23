import { TestBed, inject } from '@angular/core/testing';

import { AdminActivationService } from './admin-activation.service';

describe('AdminActivationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminActivationService]
    });
  });

  it('should ...', inject([AdminActivationService], (service: AdminActivationService) => {
    expect(service).toBeTruthy();
  }));
});
