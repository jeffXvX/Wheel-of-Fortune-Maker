import { CategoriesState } from './category/categories.state';
import { Injectable } from '@angular/core';
import { GameState } from './game.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from './game.model';
import { Category } from './category/category.model';

@Injectable()
export class GameService {
  @Select(GameState.game) game$: Observable<Game>;
  @Select(CategoriesState.categories) categories$: Observable<Category[]>;
  
  constructor() {   
  }
}
