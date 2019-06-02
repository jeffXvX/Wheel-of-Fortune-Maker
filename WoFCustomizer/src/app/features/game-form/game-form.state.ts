import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GameFormModel } from './game-form.model';
import { LoadGameForm } from './game-form.actions';
import { copyGame } from '../game/game.model';
​
@State<GameFormModel>({
  name: 'gameForm',
  defaults: {
    dirty: false,
    status: "",
    errors: {},
    model: {
        id: null,
        name: '',
        scrollingText: '',
        introText: ['','',''],
        categoryIds: []
    }
  }
})
export class GameFormState {
  @Selector() static state(state: GameFormModel) {
    return state;
  } 

  @Selector() static loaded(state: GameFormModel) {
    return state.model.id !== null;
  }
  
  @Action(LoadGameForm)
  loadGameConfig(ctx: StateContext<GameFormModel>, action: LoadGameForm) {
    console.log('loading game form', action.payload.game);
    ctx.setState({
        ...ctx.getState(),
        model: copyGame(action.payload.game)
    });
  }

  private createGameConfigForm(config: any) {
    const game = copyGame(config.game);
  }

}