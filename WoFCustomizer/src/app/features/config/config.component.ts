import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { WoFConfig } from './config.model';
import { Game } from '../game/game.model';
import { RomService } from '../rom/rom.service';

@Component({
  selector: 'wof-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  @ViewChild('configDownloadLink') configDownloadLink: ElementRef;

  config$: Observable<WoFConfig>;
  games$: Observable<Game[]>;
  lastId$: Observable<number>;
  sanitizedConfigFile$: Observable<SafeUrl>;  
  configFileName$ = new Subject<string>();
  configFileNameExists$: Observable<boolean>;
  selectedGameId: number;

  romFileName$ = new Subject<string>();

  selectedGameIdForRom: number;



  changeConfigFileName(event: Event) {
    const name = (event.target as HTMLInputElement).value;
    this.configFileName$.next(name);
  }

  constructor(private configService: ConfigService, private romService: RomService) { 
    this.config$ = this.configService.config$;
    this.games$ = this.configService.games$;
    this.lastId$ = this.configService.lastId$;
  }

  ngOnInit() {
    this.sanitizedConfigFile$ = this.configService.
      sanitizedConfigFileSubject.pipe(
        tap(config=>{
            setTimeout(_=>{
              (this.configDownloadLink.nativeElement as HTMLAnchorElement).click();
            });
        }));

    this.configFileNameExists$ = this.configFileName$.pipe(
      map(name=>name && name.length > 0)
    );
  }

  createNewConfig() {
    this.selectedGameId = undefined;
    this.configFileName$.next('wof-config.json');
    this.configService.createConfig();
  }

  openConfig(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.selectedGameId = undefined;
    this.configFileName$.next(file.name);
    this.configService.readConfig(file);
    // Reset the value to empty each time so the change event will
    // fire if the same file is selected multiple times.
    (e.target as HTMLInputElement).value = '';
  }

  openGame() {
    this.configService.readGame(this.selectedGameId);
  }

  writeConfig(e: MouseEvent) {
    this.configService.writeConfig();
  }

  writeRom(id: number) {
    this.romService.writeRom(id);
  }

  openRom(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.romService.readRom(file);
    this.romFileName$.next(file.name);
    (e.target as HTMLInputElement).value = '';
  }

}
