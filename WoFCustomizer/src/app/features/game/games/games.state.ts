import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Game } from '../game.model';
import { Category } from '../category/category.model';
import { Puzzles } from '../puzzles/puzzles.model';
import { SetGameName, SetGame } from './games.actions';
import { Puzzle } from '../puzzle/puzzle.model';


export interface GameConfig {
  game: Game,
  categories: Category[],
  puzzles: Puzzles
}

export interface Games {
  games: GameConfig[],
  selectedConfig: number,
  //selectedGame: number,
  //lastId: number,
}

@State<Games>({
  name: 'games'
})
export class GamesState {
  private static getselectedGame(games: Games) {
    return games.games[games.selectedConfig].game;
  }

  private static setGame(games: Games, game: Game) {
    games.games = [...games.games];
    games.games[games.selectedConfig] = { ...games.games[games.selectedConfig] };
    games.games[games.selectedConfig].game = game;
    return games;
  }

  private static getselectedCategories(games: Games) {
    return games.games[games.selectedConfig].categories;
  }

  /*
  private static setCategory(games: Games, category: Category) {
    games.games = [...games.games];
    games.games[games.selectedConfig] = { ...games.games[games.selectedConfig] };
    games.games[games.selectedConfig].categories[0] = category;
    return games;
  }
  */

  private static getselectedPuzzles(games: Games) {
    return games.games[games.selectedConfig].puzzles;
  }

  /*
  private static setPuzzle(games: Games, puzzle: Puzzle) {
    games.games = [...games.games];
    games.games[games.selectedConfig] = { ...games.games[games.selectedConfig] };
    games.games[games.selectedConfig].game = game;
    return games;
  }
  */

  @Selector() static selectedGame(state: Games) {
    return GamesState.getselectedGame(state);
  }

  @Selector() static selectedPuzzles(state: Games) {
    return GamesState.getselectedPuzzles(state);
  }

  @Selector() static selectedCategories(state: Games) {
    return GamesState.getselectedCategories(state);
  }

  @Selector() static gameName(state: Games) {
    return GamesState.getselectedGame(state).name;
  }

  @Action(SetGameName)
  SetGameName(ctx: StateContext<Games>, action: SetGameName) {
    const gamesState = {...ctx.getState()};
    const selectedGameState = {...GamesState.getselectedGame(gamesState)};
    selectedGameState.name = action.payload.name;
    ctx.setState(GamesState.setGame(gamesState, selectedGameState));
  }

  @Action(SetGame)
  SetGame(ctx: StateContext<Games>, action: SetGame) {
    const gamesState = {...ctx.getState()};
    ctx.setState(GamesState.setGame(gamesState,action.payload));
  }
}