import { TestBed } from '@angular/core/testing';

import { DialogHandlingService } from './dialog-handling.service';

describe('DialogHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogHandlingService = TestBed.get(DialogHandlingService);
    expect(service).toBeTruthy();
  });
});
