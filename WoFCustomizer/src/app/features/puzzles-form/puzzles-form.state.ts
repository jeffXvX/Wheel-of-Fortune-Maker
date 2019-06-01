import { State, Selector, Action, StateContext } from '@ngxs/store';
import { PuzzlesFormModel } from './puzzles-form.model';
import { LoadPuzzles } from './puzzles-form.actions';
import { Puzzles } from '../game/puzzles/puzzles.model';
​
@State<PuzzlesFormModel>({
  name: 'puzzlesForm',
  defaults: {}
})
export class PuzzlesFormState {
  @Selector() static form(state: PuzzlesFormModel) {
    return state;
  }

  @Action(LoadPuzzles)
  loadGameConfig(ctx: StateContext<PuzzlesFormModel>, action: LoadPuzzles) {
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