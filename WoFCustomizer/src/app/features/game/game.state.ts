import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Game, GameFormState } from './game.model';
import { SetGameName, SetGame, ResetGame, SetIntroText, SetScrollingText } from './game.actions';

/*
@State<GameFormState>({
  name: 'game',
  defaults: {
    gameForm: {
      id: 0,
      name: '',
      scrollingText: '',
      introText: ['','',''],
      categoryIds: []
    }
  }
})
export class GameState {
  @Selector() static game(state: GameFormState) {
    return state.gameForm;
  }

  @Selector() static gameName(state: GameFormState) {
    return state.gameForm.name;
  }

  @Selector() static gameIsLoaded(state: GameFormState) {
    return !!state.gameForm.name;
  }

  @Selector() static scrollingText(state: GameFormState) {
    return state.gameForm.scrollingText;
  }

  @Selector() static introText(state: GameFormState) {
    return state.gameForm.introText;
  }

  @Action(ResetGame)
  ResetGame(ctx: StateContext<GameFormState>) {
    ctx.setState({ 
      gameForm: {
        id: undefined,
        name: undefined,
        categoryIds: undefined,
        introText: undefined,
        scrollingText: undefined
      }
    });
  }
  ​ 
  @Action(SetGameName)
  SetGameName(ctx: StateContext<GameFormState>, action: SetGameName) {
    const newState = { ...ctx.getState().gameForm };
    newState.name = action.payload.name;
    ctx.setState({ gameForm: newState});
  }

  @Action(SetGame)
  SetGame(ctx: StateContext<GameFormState>, action: SetGame) {
    ctx.setState({ gameForm: action.payload });
  }

  @Action(SetIntroText)
  SetIntroText(ctx: StateContext<GameFormState>, action: SetIntroText) {
    const newState = { ...ctx.getState().gameForm };
    newState.introText[action.payload.index] = action.payload.text;
    ctx.setState({ gameForm: newState });
  }

  @Action(SetScrollingText)
  SetScrollingText(ctx: StateContext<GameFormState>, action: SetScrollingText) {
    const newState = { ...ctx.getState().gameForm };
    newState.scrollingText = action.payload.text;
    ctx.setState({ gameForm: newState });
  }
}
*/

@State<Game>({
  name: 'game',
  defaults: {
      id: 0,
      name: '',
      scrollingText: '',
      introText: ['','',''],
      categoryIds: []    
  }
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

  @Selector() static scrollingText(state: Game) {
    return state.scrollingText;
  }

  @Selector() static introText(state: Game) {
    return state.introText;
  }

  @Action(ResetGame)
  ResetGame(ctx: StateContext<Game>) {
    ctx.setState({ 
      id: undefined,
      name: undefined,
      categoryIds: undefined,
      introText: undefined,
      scrollingText: undefined    
    });
  }
  ​ 
  @Action(SetGameName)
  SetGameName(ctx: StateContext<Game>, action: SetGameName) {
    const newState = { ...ctx.getState() };
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
    newState.introText[action.payload.index] = action.payload.text;
    ctx.setState(newState);
  }

  @Action(SetScrollingText)
  SetScrollingText(ctx: StateContext<Game>, action: SetScrollingText) {
    const newState = { ...ctx.getState() };
    newState.scrollingText = action.payload.text;
    ctx.setState(newState);
  }
}