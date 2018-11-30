import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { GameState } from '../features/game/game.state';
import { CategoriesState } from '../features/game/category/categories.state';
import { PuzzlesState } from '../features/game/puzzle/puzzles.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      GameState,
      CategoriesState,
      PuzzlesState,
    ])    
  ]
})
export class StoreModule { }
