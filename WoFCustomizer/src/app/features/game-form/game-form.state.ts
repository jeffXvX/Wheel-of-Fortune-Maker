import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GameFormModel, defaultGameFormModel } from './game-form.model';
import { LoadGameForm, LoadDefaultGameForm } from './game-form.actions';
import { copyGame } from '../game/game.model';
​
@State<GameFormModel>({
  name: 'gameForm',
  defaults: defaultGameFormModel()
})
export class GameFormState {
  @Selector() static state(state: GameFormModel) {
    return state;
  } 

  @Selector() static loaded(state: GameFormModel) {
    return state.model.id !== null;
  }
  
  @Action(LoadGameForm)
  loadGameForm(ctx: StateContext<GameFormModel>, action: LoadGameForm) {
    console.log('loading game form', action.payload.game);
    ctx.setState({
        ...ctx.getState(),
        model: copyGame(action.payload.game)
    });
  }

  @Action(LoadDefaultGameForm)
  loadDefaultGameForm(ctx: StateContext<GameFormModel>) {
    ctx.setState(defaultGameFormModel());
  }

  private createGameConfigForm(config: any) {
    const game = copyGame(config.game);
  }

}