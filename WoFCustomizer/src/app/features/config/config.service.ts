import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { ConfigState } from './config.state';
import { WoFConfig } from './config.model';
import { Game } from '../game/game.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { SetConfig, SelectGameConfig, CreateConfig } from './config.actions';

@Injectable()
export class ConfigService {
  @Select(ConfigState.config) config$: Observable<WoFConfig>;
  @Select(ConfigState.games) games$: Observable<Game[]>;
  @Select(ConfigState.lastId) lastId$: Observable<number>;

  sanitizedConfigFileSubject = new Subject<SafeUrl>();
  configFile: string;
  
  constructor(
    private store: Store, 
    private sanitizer: DomSanitizer) {
  }

  createConfig() {
    this.store.dispatch(new CreateConfig());
  }

  readConfig(file: File) {
    const reader = new FileReader();
    reader.onloadend = pe => {
      const json = JSON.parse(reader.result as string);
      this.store.dispatch(new SetConfig(json));
    };
    const text = reader.readAsText(file);
  }

  readGame(id: number) {
    if(id !== undefined && id !== null) {
      this.store.dispatch(new SelectGameConfig({ id: id }));
    }
  }
  
  writeConfig() {
    const writeConfigSub = this.config$.subscribe(config=>{
      let configBlob = new Blob([JSON.stringify(config)], {type: 'text/plain'});
      if (this.configFile !== null) {
        window.URL.revokeObjectURL(this.configFile);
      }
      this.configFile = window.URL.createObjectURL(configBlob);
      this.sanitizedConfigFileSubject.next(this.sanitizer.bypassSecurityTrustUrl(this.configFile));
      writeConfigSub.unsubscribe();
    }); 
  }


}
