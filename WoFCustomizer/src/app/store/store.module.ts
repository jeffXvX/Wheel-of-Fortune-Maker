import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { environment } from 'src/environments/environment';
import { GameState } from '../features/game/game.state';
import { CategoriesState } from '../features/game/categories/categories.state';
import { CategoryState } from '../features/game/category/category.state';
import { PuzzlesState } from '../features/game/puzzles/puzzles.state';
import { ConfigState } from '../features/config/config.state';
import { RomState } from '../features/rom/rom.state';
import { RomConstantsState } from '../features/rom/rom-constants/rom-constants.state';
import { ErrorHandlingState } from '../features/error-handling/error-handling.state';
import { GameConfigState } from '../features/game-config/game-config.state';
import { GameFormState } from '../features/game-form/game-form.state';
import { CategoriesFormState } from '../features/categories-form/categories-form.state';
import { PuzzlesFormState } from '../features/puzzles-form/puzzles-form.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ConfigState,
      GameConfigState,

      GameFormState,
      CategoriesFormState,
      PuzzlesFormState,

      GameState,
      CategoriesState,
      CategoryState,
      PuzzlesState,
      RomState,
      RomConstantsState,
      ErrorHandlingState
    ], 
    { developmentMode: false }),
    NgxsFormPluginModule.forRoot(),    
  ]
})
export class StoreModule { }
