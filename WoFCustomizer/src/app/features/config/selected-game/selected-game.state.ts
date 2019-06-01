import { State, Selector } from '@ngxs/store';
import { GameConfig } from '../../game/games/games.state';
​
@State<GameConfig>({
  name: 'selectedGame'
})
export class ConfigState {
  @Selector() static selectedGame(state: GameConfig) {
    return state;
  }

  /*
  @Action(DeleteGameConfig)
  deleteGameConfig(ctx: StateContext<WoFConfig>, action: DeleteGameConfig) {
    const state = ctx.getState();

    ctx.setState({
      version: state.version,
      games: state.games.filter(gameConfig=> gameConfig.game.id != action.payload.id),
      //selectedGameIndex: state.selectedGameIndex,
    });
  }
  */

}