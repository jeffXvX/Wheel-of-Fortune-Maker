import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { environment } from 'src/environments/environment';
import { ConfigState } from '../features/config/config.state';
import { RomState } from '../features/rom/rom.state';
import { RomConstantsState } from '../features/rom/rom-constants/rom-constants.state';
import { ErrorHandlingState } from '../features/error-handling/error-handling.state';
import { GameFormState } from '../features/game-form/game-form.state';
import { CategoriesFormState } from '../features/categories-form/categories-form.state';
import { PuzzlesFormState } from '../features/puzzles-form/puzzles-form.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([
      ConfigState,
      GameFormState,
      CategoriesFormState,
      PuzzlesFormState,
      RomState,
      RomConstantsState,
      ErrorHandlingState
    ], 
    { developmentMode: false }),
    NgxsFormPluginModule.forRoot(),    
  ]
})
export class StoreModule { }
