import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Game } from './game.model';
import { SetGameName, SetGame, ResetGame, SetIntroText, SetScrollingText } from './game.actions';

@State<Game>({
  name: 'game'
})
export class GameState {
  @Selector() static game(state: Game) {
    return state;
  }

  @Selector() static gameName(state: Game) {
    return state.name;
  }

  @Selector() static gameIsLoaded(state: Game) {
    return !!state.name;
  }

  @Action(ResetGame)
  ResetGame(ctx: StateContext<Game>) {
    ctx.setState({
      id: undefined,
      name: undefined,
      categoryIds: undefined,
      introText: undefined,
      scrollingText: undefined,
    });
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

  @Action(SetIntroText)
  SetIntroText(ctx: StateContext<Game>, action: SetIntroText) {
    const newState = { ...ctx.getState() };
    newState.introText = action.payload.text;
    ctx.setState(newState);
  }

  @Action(SetScrollingText)
  SetScrollingText(ctx: StateContext<Game>, action: SetScrollingText) {
    const newState = { ...ctx.getState() };
    newState.scrollingText = action.payload.text;
    ctx.setState(newState);
  }
}