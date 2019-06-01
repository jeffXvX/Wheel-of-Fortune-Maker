import { Injectable } from '@angular/core';
import { GameState } from './game.state';
import { CategoriesState } from './categories/categories.state';
import { PuzzlesState } from './puzzles/puzzles.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Game } from './game.model';
import { Category } from './category/category.model';
import { SetGameName, SetScrollingText, SetIntroText } from './game.actions';
import { GameConfigState } from '../game-config/game-config.state';
import { GameConfig } from './games/games.state';
import { map } from 'rxjs/operators';
import { GameConfigForm } from '../game-config/game-config.model';

@Injectable()
export class GameService {
  //@Select(GameState.game) game$: Observable<Game>;
  //@Select(GameState.gameName) gameName$: Observable<string>;
  @Select(GameState.gameIsLoaded) isLoaded$: Observable<boolean>;
  @Select(GameState.scrollingText) scrollingText$: Observable<string>;
  @Select(GameState.introText) introText$: Observable<string[3]>;
  @Select(CategoriesState.categories) categories$: Observable<Category[]>;
  @Select(PuzzlesState.totalPuzzles) totalPuzzles$: Observable<number>;
  @Select(PuzzlesState.characterUsed) charactersUsed$: Observable<number>;


  @Select(GameConfigState.config) gameConfigForm$: Observable<GameConfigForm>;
  game$: Observable<Game>;
  gameName$: Observable<string>;

  constructor(private store: Store) {   
    this.game$ = this.gameConfigForm$.pipe(map(config=>config.form.model.game));
    //this.gameName$ = this.gameConfigForm$.pipe(map(config=>config.form.model.game.name));
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
