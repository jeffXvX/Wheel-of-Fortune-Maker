import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Rom, defaultRom } from './rom.model';
import { SetRomContents, ClearRomContents } from './rom.actions';

@State<Rom>({
  name: 'rom',
  defaults: defaultRom()
})
export class RomState {
  @Selector() static contents(state: Rom) {
    return state.contents;
  }

  @Selector() static isLoaded(state: Rom) {
    return state.contents.length > 0;
  }

  @Action(SetRomContents)
  SetRomContents(ctx: StateContext<Rom>, action: SetRomContents) {
    const newState = {...ctx.getState()};
    newState.contents = new Uint8Array(action.payload.contents);
    console.log("Setting rom contenst:\n",newState);
    ctx.setState(newState);
  }

  @Action(ClearRomContents)
  ClearRomContents(ctx: StateContext<Rom>) {
    const newState = {...ctx.getState()};
    newState.contents = new Uint8Array();
    ctx.setState(newState);  }
}