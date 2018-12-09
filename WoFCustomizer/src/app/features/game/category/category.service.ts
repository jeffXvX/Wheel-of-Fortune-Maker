import { Injectable } from '@angular/core';
import { CategoriesState } from './categories.state';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { PuzzlesState } from '../puzzle/puzzles.state';
import { ChangeCategoryName } from './categories.actions';
import { Category } from './category.model';
import { AddPuzzles } from '../puzzle/puzzles.actions';

@Injectable()
export class CategoryService {
  constructor(private store: Store) {   
  }

  changeCategoryName(category: Category, newName: string) {
    this.store.dispatch(new ChangeCategoryName(category.id, newName));
  }

  addPuzzles(id: number, numPuzzles: number) {
    this.store.dispatch(new AddPuzzles(id, numPuzzles));
  }

  category$(id:number) {
    return this.store.select(CategoriesState.category)
      .pipe(map(catFilter=>catFilter(id)))
  }

  puzzles$(catId: number) {
    return this.store.select(PuzzlesState.puzzlesByCategoryId)
      .pipe(map(puzzlesFilterFn=>puzzlesFilterFn(catId)));
  }

  numPuzzles$(catId: number) {
    return this.store.select(PuzzlesState.numPuzzles)
      .pipe(map(puzzlesFilterFn=>puzzlesFilterFn(catId)));
  }
}
