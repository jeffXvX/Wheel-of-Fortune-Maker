import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Game } from './game.model';
​import { defaultGame } from './default-game.model';
import { SetGameName, SetGame } from './game.actions';

@State<Game>({
  name: 'game',
  defaults: defaultGame()
})
export class GameState {
  @Selector() static game(state: Game) {
    return state;
  }

  @Selector() static gameName(state: Game) {
    return state.name;
  }
  ​
  @Action(SetGameName)
  SetGameName(ctx: StateContext<Game>, action: SetGameName) {
    const newState = {...ctx.getState()};
    newState.name = action.payload.name;
    ctx.setState(newState);
  }

  @Action(SetGame)
  SetGame(ctx: StateContext<Game>, action: SetGame) {
    ctx.setState(action.payload);
  }
}