import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { WoFConfig } from './config.model';
import { defaultWoFConfig } from './default-config.model';
import { SetConfig, SelectGameConfig, AddGameConfig, DeleteGameConfig, CreateConfig, SetGameConfig } from './config.actions';
import { copyGame, Game } from '../game/game.model';
import { copyCategories, Categories } from '../game/categories/categories.model';
import { copyPuzzles, Puzzles } from '../game/puzzles/puzzles.model';
import { defaultGame } from '../game/default-game.model';
import { defaultPuzzles } from '../game/puzzles/default_puzzles.model';
import { defaultCategories } from '../game/categories/default_categories.model';
import { GameConfig } from '../game-config/game-config.model';
import { LoadGameForm } from '../game-form/game-form.actions';
import { LoadCategoriesForm } from '../categories-form/categories-form.actions';
import { LoadPuzzlesForm } from '../puzzles-form/puzzles-form.actions';
​
@State<WoFConfig>({
  name: 'config',
  //defaults: defaultWoFConfig()
})
export class ConfigState {
  @Selector() static config(state: WoFConfig) {
    return state;
  } 

  @Selector() static lastId(state: WoFConfig) {
    return state.games.reduce((lastId: number, gameConfig: GameConfig)=>
      Math.max(lastId,gameConfig.game.id),
      -1);
  }
  
  @Selector() static games(state: WoFConfig) {
    return state.games.map(gameConfig=>gameConfig.game);
  }

  @Action(CreateConfig)
  CreateConfig(ctx: StateContext<WoFConfig>) {
    ctx.setState(defaultWoFConfig());

    const resetActions = [];

    /*
    const resetActions = [
      new ResetGame(),
      new ResetCategories(),
      new ResetPuzzles()
    ];
    */

    return ctx.dispatch(resetActions);
  }

  @Action(SetConfig)
  changeName(ctx: StateContext<WoFConfig>, action: SetConfig) {
    ctx.setState(action.payload);

    const resetActions = [];
    /*
      new ResetGame(),
      new ResetCategories(),
      new ResetPuzzles()
    ];
    */

    return ctx.dispatch(resetActions);
  }

  @Action(SelectGameConfig)
  changeSelectedGame(ctx: StateContext<WoFConfig>, action: SelectGameConfig) {
    const state = ctx.getState();

    let gameConfig = state.games.find(gameConfig=>gameConfig.game.id === action.payload.id);
    let game: Game;
    let puzzles: Puzzles;
    let categories: Categories;
    const asyncActions = [];

    if(gameConfig) {
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
      game = copyGame(gameConfig.game);
      puzzles = copyPuzzles(gameConfig.puzzles);
      categories = copyCategories(gameConfig.categories);
    }
    else {
      /**
       * If the game config was not found create 
       * and add a new one with the payload id.
       */
      game = defaultGame(action.payload.id);
      puzzles = defaultPuzzles();
      categories = defaultCategories();

      asyncActions.push(
        new AddGameConfig({
          game: game,
          categories: categories,
          puzzles: puzzles
        }));
    }

    /*
    asyncActions.push(new SetGame(game));
    asyncActions.push(new SetCategories(categories));
    asyncActions.push(new SetPuzzles(puzzles));
    */

    /*
    asyncActions.push(new LoadGameConfig({ config: 
      { 
        game: game,
        puzzles: puzzles,
        categories: categories 
      } 
    } ));
    */

    asyncActions.push(new LoadGameForm({ game: game}));
    asyncActions.push(new LoadCategoriesForm({ 
      categories: categories
    }));

    asyncActions.push(new LoadPuzzlesForm({ puzzles: puzzles }))

    return ctx.dispatch(asyncActions);
  }

  @Action(AddGameConfig)
  addGameConfig(ctx: StateContext<WoFConfig>, action: AddGameConfig) {
    const state = ctx.getState(); 
    const game = { 
        ...action.payload, 
    }; 
    
    ctx.setState({
      version: state.version,
      games: [...state.games, game],
    })
  }

  @Action(DeleteGameConfig)
  deleteGameConfig(ctx: StateContext<WoFConfig>, action: DeleteGameConfig) {
    const state = ctx.getState();

    ctx.setState({
      version: state.version,
      games: state.games.filter(gameConfig=> gameConfig.game.id != action.payload.id),
    });
  }

  @Action(SetGameConfig)
  SetConfig(ctx: StateContext<WoFConfig>, action: SetGameConfig) {
    const state = ctx.getState();
    let idx = state.games.findIndex(
      gameConfig=>gameConfig.game.id === action.payload.gameConfig.game.id);
    let newState = {...state};

    console.log('setting game config to:', action.payload.gameConfig);
    
    if(idx >= 0) {
      newState.games[idx] = action.payload.gameConfig;
    }
     
    console.log('new state',newState);
    ctx.setState(newState);
  }
  
  constructor(private store: Store) {}

}