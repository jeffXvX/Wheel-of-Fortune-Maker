import { TestBed } from '@angular/core/testing';

import { ConfigEntryEncoderService } from './config-entry-encoder.service';

describe('ConfigEntryEncoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigEntryEncoderService = TestBed.get(ConfigEntryEncoderService);
    expect(service).toBeTruthy();
  });
});
