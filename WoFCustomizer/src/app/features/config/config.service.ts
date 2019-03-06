import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { ConfigState } from './config.state';
import { WoFConfig } from './config.model';
import { Game } from '../game/game.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { SetConfig, SelectGameConfig, CreateConfig } from './config.actions';
import { RomState } from '../rom/rom.state';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ConfigService {
  @Select(ConfigState.config) config$: Observable<WoFConfig>;
  @Select(ConfigState.games) games$: Observable<Game[]>;
  @Select(ConfigState.lastId) lastId$: Observable<number>;

  @Select(RomState.isLoaded) romIsLoaded$: Observable<boolean>;

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
      const config = this.updateConfigThroughVersions(json);
      console.log(config);
      this.store.dispatch(new SetConfig(config));
    };
    const text = reader.readAsText(file);
  }

  readGame(id: number) {
    if(id !== undefined && id !== null) {
      this.store.dispatch(new SelectGameConfig({ id: id }));
    }
  }
  
  writeConfig() {
    this.store.selectOnce(ConfigState.config).subscribe(config=>{
      let configBlob = new Blob([JSON.stringify(config)], {type: 'text/plain'});
      if (this.configFile !== null) {
        window.URL.revokeObjectURL(this.configFile);
      }
      this.configFile = window.URL.createObjectURL(configBlob);
      this.sanitizedConfigFileSubject.next(this.sanitizer.bypassSecurityTrustUrl(this.configFile));
    }); 
  }

  updateConfigThroughVersions(config: WoFConfig) {
    if(!environment.production) {
      console.log('updating config', config);
    }

    while(versionChanges[config.version]) {
      const version = config.version;
      config = { ...versionChanges[config.version](config), version: versionProgressionMap[config.version] };

      if(version === config.version) {
        throw new Error('Config not updating properly.');
      }

    }

    if(!environment.production) {
      console.log('done updating config', config);
    }

    return config;
  }
}

/*
 * These data structures are used to update the config as the format
 * changes.  This initial version is a little fiddly but eventually 
 * it should solidfy to a more automatic system.
 */

/**
 * Add an entry here for each new version mapped to the previous 
 * version.  This entry will be used to update the version entry
 * inside the config and determines when all config verion updating
 * has been completed.
 */
const versionProgressionMap = {
  '1.0': '1.1',
}

/**
 * Each config version should have an entry here that is a function that
 * takes in a config and returns a new config with the changes necessary to
 * upgrade it to the next version.
 */
const versionChanges: { [key:string]: (config: WoFConfig)=>WoFConfig } = {
  /*
   * 1.0 -> 1.1 added scrolling and intro text fields
   * to the game config entry
   */
  '1.0': (config: WoFConfig)=>{
      const newConfig = {...config };
      newConfig.games = newConfig.games.map(game=>(
        {
          ...game,
          game: {
            ...game.game,
            scrollingText: '',
            introText: new Array(3).fill(''),
          }
        }));
      return newConfig;
    }
}
