import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { FilesService } from './files.service';
import { Store, Select } from '@ngxs/store';
import { SetConfig, SelectGameConfig } from '../config/config.actions';
import { ConfigState } from '../config/config.state';
import { WoFConfig } from '../config/config.model';
import { Observable, Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Game } from '../game/game.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'wof-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesComponent implements OnInit {

  @Select(ConfigState.config) config$: Observable<WoFConfig>;

  @Select(ConfigState.games) games$: Observable<Game[]>;

  @Select(ConfigState.lastId) lastId$: Observable<number>;

  @ViewChild('configDownloadLink', { static: true }) configDownloadLink: ElementRef;

  sanitizedConfigFileSubject = new Subject<SafeUrl>();

  sanitizedConfigFile$: Observable<SafeUrl>;

  configFile: string;
  configWasChanged: boolean = false;

  get sanitizedConfigFile() {
    return this.sanitizer.bypassSecurityTrustUrl(this.configFile);
  }

  constructor(
    private filesService: FilesService, 
    private store: Store,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.config$.subscribe(c=>console.log('store config:',c));

    this.games$.subscribe(games=>console.log('games',games));

    this.sanitizedConfigFile$ = this.sanitizedConfigFileSubject.pipe(
      tap(config=>{
        console.log('this.configWasChanged',this.configWasChanged);
        if(this.configWasChanged) {
          setTimeout(_=>{
            (this.configDownloadLink.nativeElement as HTMLAnchorElement).click();
          });
          this.configWasChanged = false;
          console.log('configWasChanged cleared',this.configWasChanged);
        }
      }));
  }

  buildConfig() {
    this.filesService.buildGameJSON();
  }

  openConfig(e: Event) {
    const f = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    
    reader.onloadend = pe => {
      //console.log('read end:',reader.result);
      //console.log('json:',JSON.parse(reader.result as string));
      
      let json = JSON.parse(reader.result as string);
      this.store.dispatch(new SetConfig(json));
      //this.store.dispatch(new SelectGameConfig({id: 0}));
    };

    const text = reader.readAsText(f);

    //console.log('files',(e.target as HTMLInputElement).files);

    this.selectedGameId = -1;
  }

  selectedGameId: number;

  changeSelectedGame(e: Event) {
    //console.log('selected game changed',e);
    //this.selectedGameId = Number((e.target as HTMLSelectElement).value);
  }

  openGame() {
    console.log('selectedGameId',this.selectedGameId);
    if(this.selectedGameId !== undefined && this.selectedGameId !== null) {
      this.store.dispatch(new SelectGameConfig({ id: this.selectedGameId }));
    }
  }

  writeConfig(e: MouseEvent) {
    const writeConfigSub = this.config$.subscribe(config=>{
      let configBlob = new Blob([JSON.stringify(config)], {type: 'text/plain'});

      if (this.configFile !== null) {
        window.URL.revokeObjectURL(this.configFile);
      }
      this.configFile = window.URL.createObjectURL(configBlob);
      this.configWasChanged = true;
      console.log('configWasChanged set',this.configWasChanged);
      this.sanitizedConfigFileSubject.next(this.sanitizer.bypassSecurityTrustUrl(this.configFile));
      writeConfigSub.unsubscribe();
      //console.log('configDownloadLink', this.configDownloadLink);
      //(this.configDownloadLink.nativeElement as HTMLAnchorElement).click();
    });
    
  }
}
