import { Injectable } from '@angular/core';
import { GameState } from './game.state';
import { CategoriesState } from './categories/categories.state';
import { PuzzlesState } from './puzzles/puzzles.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from './game.model';
import { Category } from './category/category.model';
import { SetGameName, SetScrollingText, SetIntroText } from './game.actions';

@Injectable()
export class GameService {
  @Select(GameState.game) game$: Observable<Game>;
  @Select(GameState.gameName) gameName$: Observable<string>;
  @Select(GameState.gameIsLoaded) isLoaded$: Observable<boolean>;
  @Select(GameState.scrollingText) scrollingText$: Observable<string>;
  @Select(GameState.introText) introText$: Observable<string[3]>;
  @Select(CategoriesState.categories) categories$: Observable<Category[]>;
  @Select(PuzzlesState.totalPuzzles) totalPuzzles$: Observable<number>;
  @Select(PuzzlesState.characterUsed) charactersUsed$: Observable<number>;

  constructor(private store: Store) {   
  }

  setGameName(name: string) {
    this.store.dispatch(new SetGameName({name: name}));
  }

  setScrollingText(text: string) {
    this.store.dispatch(new SetScrollingText({ text: text }));
  }

  setIntroText(text: string, index: number) {
    this.store.dispatch(new SetIntroText({ text: text, index: index }));
  }

}
