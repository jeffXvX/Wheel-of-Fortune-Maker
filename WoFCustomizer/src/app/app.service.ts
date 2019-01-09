import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SelectGameConfig } from './features/config/config.actions';

@Injectable()
export class AppService {

  constructor(private store: Store) { }

  /**
   * Initialize the app to the default game inside 
   * the default config.
   */
  initApp() {
    this.store.dispatch(new SelectGameConfig({id: 0}));
  }
}
