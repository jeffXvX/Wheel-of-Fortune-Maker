import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { GameConfig } from '../../game-config/game-config.model';

@Component({
  selector: 'wof-game-selector',
  templateUrl: './game-selector.component.html',
  styleUrls: ['./game-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameSelectorComponent implements ControlValueAccessor {
  @Input() games: GameConfig[];
  
  
  onChange: (game: GameConfig)=>void;
  onTouched: ()=>void;
  disabled: boolean = true;

  createDefaultGameConfig = (id?:number): GameConfig => ({
    game: {
      id: id !== null && id !== undefined ? id : -1,
      name: 'New Game',
      scrollingText: '',
      introText: ['','',''],
      categoryIds: []  
    },
    categories: [],
    puzzles: []
  });

  defaultGameConfig = this.createDefaultGameConfig();

  selectedGame: GameConfig = this.defaultGameConfig;

  constructor(private cdRef: ChangeDetectorRef) { }

  onSelection(e: MatSelectChange) {
    this.onChange((e.value as GameConfig));
  }

  writeValue(game: GameConfig) {
    this.games.forEach(g=>{
      if(g.game.id === game.game.id) {
        this.selectedGame = g;
        this.cdRef.markForCheck();
      }
    });
  }

  registerOnChange(onChange: (game: GameConfig)=>void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: ()=>void) {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.cdRef.markForCheck();
  }
}
