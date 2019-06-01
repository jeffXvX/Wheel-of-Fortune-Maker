import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ConfigService } from './config.service';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { SelectedGameComponent } from './selected-game/selected-game.component';
import { GameSelectorComponent } from './game-selector/game-selector.component';

@NgModule({
  declarations: [ConfigComponent, SelectedGameComponent, GameSelectorComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  providers: [ConfigService],
  exports: [ConfigComponent]
})
export class ConfigModule { }
