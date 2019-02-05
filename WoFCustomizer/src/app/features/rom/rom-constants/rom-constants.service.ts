import { Injectable } from '@angular/core';
import { AllRomConstants, RomConstants } from './rom-constants.model';
import { RomConstantsState } from './rom-constants.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetRomConstants, ClearRomConstants } from './rom-constants.actions';
import { USANoRev } from '../version-constants-definitions/usa-no-revision.definitions';

@Injectable()
export class RomConstantsService {
  @Select(RomConstantsState.allConstants) romConstants$: Observable<AllRomConstants>;

  constructor(private store: Store) {
    // For now just default the constants to the no rev 
    // version since it is the only known good one. 
    this.setConstants(USANoRev);
  }

  setConstants(romConstants: RomConstants) {
    this.store.dispatch(new SetRomConstants({ constants: romConstants}));
  }

  clearConstants() {
    this.store.dispatch(new ClearRomConstants());
  }

}
