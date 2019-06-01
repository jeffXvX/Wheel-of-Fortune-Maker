import { getTestBed } from '@angular/core/testing';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GameConfig, GameConfigForm } from './game-config.model';
import { LoadGameConfig } from './game-config.actions';
import { copyGame } from '../game/game.model';
import { copyPuzzles } from '../game/puzzles/puzzles.model';
import { copyCategories } from '../game/categories/categories.model';
​
@State<GameConfigForm>({
  name: 'gameConfigForm',
  defaults: {
    form: {
      dirty: false,
      status: "",
      errors: {},
      model: {
        game: {
          id: null,
          name: '',
          scrollingText: '',
          introText: ['','',''],
          categoryIds: []
        },
        categories: [],
        puzzles: {}
      }
    }
  }
})
export class GameConfigState {
  @Selector() static config(state: GameConfigForm) {
    return state;
  } 
  
  @Action(LoadGameConfig)
  loadGameConfig(ctx: StateContext<GameConfigForm>, action: LoadGameConfig) {
    console.log('loading config', action.payload.config.game.name);
    ctx.setState({
      form: {
        ...ctx.getState().form,
        ...this.createGameConfigForm(action.payload.config)
      }
      });
  }

  /**
   * Deep copy a given config to produce a new copy.
   * @param config The config to copy.
   */
  private createGameConfigForm(config: GameConfig) {
    const game = copyGame(config.game);
    const puzzles = copyPuzzles(config.puzzles);
    const categories = copyCategories(config.categories);

    const newConfig = {
      model: {
        game: game,
        puzzles: puzzles,
        categories: categories
      }
    }

    return newConfig;
  }

}