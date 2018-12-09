import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Game } from './game.model';
​import { defaultGame } from './default-game.model';
import { SetGameName } from './game.actions';

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
    newState.name = action.name;
    ctx.setState(newState);
  }
}