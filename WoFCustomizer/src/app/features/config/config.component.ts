import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { WoFConfig } from './config.model';
import { Game } from '../game/game.model';

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
  selectedGameId: number;
  configFile: string;

  constructor(private configService: ConfigService) { 
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
  }

  createNewConfig() {
    this.configService.createConfig();
  }

  openConfig(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.configService.readConfig(file);
    //this.selectedGameId = -1;
  }

  openGame() {
    this.configService.readGame(this.selectedGameId);
  }

  writeConfig(e: MouseEvent) {
    this.configService.writeConfig();
  }

}
