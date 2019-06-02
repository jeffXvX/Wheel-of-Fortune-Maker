import { TestBed } from '@angular/core/testing';

import { GameValidatorService } from './game-validator.service';

describe('GameValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameValidatorService = TestBed.get(GameValidatorService);
    expect(service).toBeTruthy();
  });
});
