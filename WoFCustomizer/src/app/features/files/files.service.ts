import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { GameState } from '../game/game.state';
import { CategoriesState } from '../game/categories/categories.state';
import { PuzzlesState } from '../game/puzzles/puzzles.state';
import { Game } from '../game/game.model';
import { Category } from '../game/category/category.model';
import { Puzzles } from '../game/puzzles/puzzles.model';
import { GameConfig } from '../config/config.model';

@Injectable()
export class FilesService {
  @Select(GameState.game) game$: Observable<Game>;
  @Select(CategoriesState.categories) categories$: Observable<Category[]>;
  @Select(PuzzlesState.puzzles) puzzles$: Observable<Puzzles>;
  
  constructor() {   
  }

  buildGameJSON() {

    
    combineLatest(
      this.game$,
      this.categories$,
      this.puzzles$
    )
    .subscribe(([game,categories, puzzles])=>{
      //console.log('game data:',game,categories, puzzles);
      let config: GameConfig = {
        game: game,
        categories: categories,
        puzzles: puzzles
      };
  
      console.log('game data:',[{ game: game, categories: categories, puzzles: puzzles}]);
    });
  }
}
