import { State, Selector } from '@ngxs/store';
import { Game } from './game.model';
​import {defaultGame} from './default-game.model';

@State<Game>({
  name: 'game',
  defaults: defaultGame()
})
export class GameState {
  @Selector() static game(state: Game) {
    return state;
  }
​
}