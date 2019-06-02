import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PuzzlesFormModel } from './puzzles-form.model';
import { LoadPuzzlesForm } from './puzzles-form.actions';
import { Puzzles } from '../game/puzzles/puzzles.model';
​
@State<PuzzlesFormModel>({
  name: 'puzzlesForm',
  defaults: {}
})
export class PuzzlesFormState {
  @Selector() static state(state: PuzzlesFormModel) {
    return state;
  }

  @Selector() static dirty(state: PuzzlesFormModel) {
    return Object.keys(state).reduce(
      (dirty,catId)=>state[catId].dirty || dirty, false) as boolean;
  }

  @Action(LoadPuzzlesForm)
  loadGameConfig(ctx: StateContext<PuzzlesFormModel>, action: LoadPuzzlesForm) {
    console.log('loading puzzles form', action.payload.puzzles);
    console.log('transformed puzzles',this.createPuzzlesForms(action.payload.puzzles))
    ctx.setState(this.createPuzzlesForms(action.payload.puzzles));
  }

  private createPuzzlesForms(puzzles: Puzzles): PuzzlesFormModel {
    return Object.keys(puzzles).reduce((puzzlesForm: PuzzlesFormModel, catId)=>({
        ...puzzlesForm,
        [catId]: {
            dirty: false,
            status: "",
            errors: {},
            model: { 
                puzzles: [...puzzles[catId]],
            },
        }         
    }), {});
  }

}