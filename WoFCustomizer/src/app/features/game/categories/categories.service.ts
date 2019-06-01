import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CategoriesState } from './categories.state';
import { Observable } from 'rxjs';
import { Categories } from './categories.model';
import { SelectCategory } from './categories.actions';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  @Select(CategoriesState.categories) categories$: Observable<Categories>;
  @Select(CategoriesState.categoriesAreLoaded) areLoaded$: Observable<boolean>;

  selectCategory(index: number) {
    this.store.dispatch(new SelectCategory({index: index}));
  }

  constructor(private store: Store) { }
}
