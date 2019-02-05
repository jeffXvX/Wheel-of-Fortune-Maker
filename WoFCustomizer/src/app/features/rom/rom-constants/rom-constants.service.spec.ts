import { TestBed } from '@angular/core/testing';

import { RomConstantsService } from './rom-constants.service';

describe('RomConstantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RomConstantsService = TestBed.get(RomConstantsService);
    expect(service).toBeTruthy();
  });
});
