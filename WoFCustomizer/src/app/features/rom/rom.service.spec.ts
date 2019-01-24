import { TestBed } from '@angular/core/testing';

import { RomService } from './rom.service';

describe('RomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RomService = TestBed.get(RomService);
    expect(service).toBeTruthy();
  });
});
