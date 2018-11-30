import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Puzzle } from './puzzle.model';
import { AddPuzzles, SetPuzzleAnswerLine } from './puzzles.actions';

@State<Puzzle[]>({
  name: 'puzzles',
  defaults: []
})
export class PuzzlesState {
  @Selector() static puzzles(state: Puzzle[]) {
    return (categoryId: number) => 
      state.filter(puzzle=>puzzle.categoryId === categoryId);
  }

  @Action(AddPuzzles)
  addPuzzles(ctx: StateContext<Puzzle[]>, action: AddPuzzles) {
    const state = ctx.getState();
    let newPuzzles: Puzzle[] = [];
    for(let i = 0; i < action.numPuzzles; i++) {
      newPuzzles.push({
        categoryId: action.catId,
        line1: '',
        line2: '',
        line3: '',
        line4: '',
      });
    }

    ctx.setState([
      ...state,
      ...newPuzzles 
    ]);
  }
  
  @Action(SetPuzzleAnswerLine)
  setLine(ctx: StateContext<Puzzle[]>, action: SetPuzzleAnswerLine) {
    const state = ctx.getState();
    let puzzle = state.find(puzzle=>puzzle===action.puzzle)

    switch(action.line) {
      case 0: { puzzle.line1 = action.answer; break; }
      case 1: { puzzle.line2 = action.answer; break; }
      case 2: { puzzle.line3 = action.answer; break; }
      case 3: { puzzle.line4 = action.answer; break; }
      default: { break; }
    }

    ctx.setState([
      ...state
    ]);
  }
}