import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameFormState } from '../features/game-form/game-form.state';
import { CategoriesFormState } from '../features/categories-form/categories-form.state';
import { PuzzlesFormState } from '../features/puzzles-form/puzzles-form.state';
import { GameFormModel } from '../features/game-form/game-form.model';
import { CategoriesFormModel } from '../features/categories-form/categories-form.model';
import { PuzzlesFormModel } from '../features/puzzles-form/puzzles-form.model';
import { Puzzles } from '../features/game/puzzles/puzzles.model';
import { SetGameConfig } from '../features/config/config.actions';
import { GameConfig } from '../features/game-config/game-config.model';

@Injectable()
export class LayoutService {
  @Select(GameFormState.state) gameForm$: Observable<GameFormModel>;
  @Select(CategoriesFormState.state) categoriesForm$: Observable<CategoriesFormModel>; 
  @Select(PuzzlesFormState.state) puzzlesForm$: Observable<PuzzlesFormModel>;
  
  constructor(private store: Store) { }

  convertFormsToConfigEntry() {
    zip(
      this.store.selectOnce(GameFormState.state),
      this.store.selectOnce(CategoriesFormState.state),
      this.store.selectOnce(PuzzlesFormState.state),
      this.store.selectOnce(PuzzlesFormState.dirty)
      ).pipe(
        map(([gameForm, categoriesForm, puzzlesForm, puzzlesDirty])=>{
          if(gameForm && categoriesForm && puzzlesForm) {
            if(gameForm.dirty || categoriesForm.dirty || puzzlesDirty) {
              console.log('dirt found')
              return {
                ...this.convertGameFormToGame(gameForm),
                ...this.convertCategoriesFormToCategories(categoriesForm),
                ...this.convertPuzzlesFormToPuzzles(puzzlesForm)
              }
            }
            else {
              console.log('clean');
              return {};
            }
          }
        }))
      .subscribe((config:GameConfig)=>{
        console.log('converted config',config);
        if(config && config.game) {
          this.store.dispatch(new SetGameConfig({ gameConfig: config }));
        }
      });
  }

  convertGameFormToGame(gameForm: GameFormModel): Partial<GameConfig> {
    return  { game: gameForm.model };
  }

  convertCategoriesFormToCategories(categoriesForm: CategoriesFormModel): Partial<GameConfig> {
    return { categories: categoriesForm.model.categories };
  }

  convertPuzzlesFormToPuzzles(puzzlesForm: PuzzlesFormModel): Partial<GameConfig> {
    let puzzles = Object.keys(puzzlesForm).reduce((puzzles: Puzzles,catId)=>{
      puzzles[catId] = puzzlesForm[catId].model.puzzles;
      return puzzles;
    },{});
    return { puzzles: puzzles };
  }

}
