import { State, Selector, Action, StateContext } from '@ngxs/store';
import { WoFConfig } from './config.model';
import { SetConfig, SelectGameConfig, AddGameConfig, DeleteGameConfig } from './config.actions';
import { SetGame } from '../game/game.actions';
import { defaultGame } from '../game/default-game.model';
import { defaultPuzzles } from '../game/puzzle/default_puzzles.model';
import { SetCategories } from '../game/category/categories.actions';
import { SetPuzzles } from '../game/puzzle/puzzles.actions';
import { defaultCategories } from '../game/category/default_categories.model';
import { copyGame } from '../game/game.model';
import { copyCategories } from '../game/categories/categories.model';
import { copyPuzzles } from '../game/puzzle/puzzles.model';
​
@State<WoFConfig>({
  name: 'config',
  defaults: { games: [], selectedGame: -1, lastId: -1 }
})
export class ConfigState {
  @Selector() static config(state: WoFConfig) {
    return state;
  } 

  @Selector() static selectedGame(state: WoFConfig) {
    return state.games.find(game=>game.id === state.selectedGame);
  } 

  @Selector() static lastId(state: WoFConfig) {
    return state.lastId;
  } 

  @Action(SetConfig)
  changeName(ctx: StateContext<WoFConfig>, action: SetConfig) {
    ctx.setState(action.payload);
  }

  @Action(SelectGameConfig)
  changeSelectedGame(ctx: StateContext<WoFConfig>, action: SelectGameConfig) {
    ctx.setState({
        ...ctx.getState(),
        selectedGame: action.payload.id
    });

    const gconfig =  ctx.getState().games.find(game=>game.id === ctx.getState().selectedGame);

    /**
     * Create a deep copy of the data if found.  This is so 
     * the data isn't written back out and saved to the file 
     * unless the user explicitly wants to save the changes.
     * 
     * If we don't deep copy then the nested data structures 
     * will be changed and the data rewritten to the new state
     * if the user writes anything intentionally back out, even
     * if the changes were to a different game config.
     */
    const game = copyGame(gconfig.game || defaultGame());
    const puzzles = copyPuzzles(gconfig.puzzles || defaultPuzzles());
    const categories = copyCategories(gconfig.categories || defaultCategories());

    return ctx.dispatch([
        new SetGame(game), 
        new SetCategories(categories), 
        new SetPuzzles(puzzles)
    ]);
  }

  @Action(AddGameConfig)
  addGameConfig(ctx: StateContext<WoFConfig>, action: AddGameConfig) {
    const state = ctx.getState(); 
    const lastId = state.lastId;
    const game = { 
        ...action.payload, 
        id: lastId + 1
    }; 
    
    ctx.setState({
        games: [...state.games, game],
        selectedGame: state.selectedGame,
        lastId: lastId + 1
    })
  }

  @Action(DeleteGameConfig)
  deleteGameConfig(ctx: StateContext<WoFConfig>, action: DeleteGameConfig) {
    const state = ctx.getState();
    const isdeletingSelectedGame = action.payload.id === state.selectedGame;

    ctx.setState({
        games: state.games.filter(game=> game != action.payload),
        lastId: state.lastId,
        selectedGame: isdeletingSelectedGame? -1 : state.selectedGame
    });
  }

}