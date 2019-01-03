import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GameState } from '../features/game/game.state';
import { CategoriesState } from '../features/game/category/categories.state';
import { PuzzlesState } from '../features/game/puzzle/puzzles.state';
import { ConfigState } from '../features/config/config.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ConfigState,
      GameState,
      CategoriesState,
      PuzzlesState,
    ])    
  ]
})
export class StoreModule { }
