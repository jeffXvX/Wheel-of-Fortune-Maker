import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GameForm } from './game-form.model';
import { LoadGameForm } from './game-form.actions';
import { copyGame } from '../game/game.model';
​
@State<GameForm>({
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
  @Selector() static config(state: GameForm) {
    return state;
  } 
  
  @Action(LoadGameForm)
  loadGameConfig(ctx: StateContext<GameForm>, action: LoadGameForm) {
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