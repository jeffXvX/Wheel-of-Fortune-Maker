import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Puzzle } from './puzzle.model';
import { AddPuzzles, SetPuzzleAnswerLine } from './puzzles.actions';
import { Puzzles } from './puzzles.model';
import { maxPuzzlesPerCategory } from '../category/category.model';
import { defaultPuzzles } from './default_puzzles.model';

@State<Puzzles>({
  name: 'puzzles',
  defaults: defaultPuzzles()
})
export class PuzzlesState {
  static maxPuzzles = maxPuzzlesPerCategory;

  @Selector() static puzzles(state: Puzzles) {
    return (categoryId: number) => 
      state[categoryId];
  }

  @Selector() static totalPuzzles(state: Puzzles) {
    return Object.keys(state).reduce((length, columnId)=>{
        return length + state[columnId].length;
    }, 0);
  }
  
  @Selector() static numPuzzles(state: Puzzles) {
    return (categoryId: number) => 
      state[categoryId].length;
  }

  @Action(AddPuzzles)
  addPuzzles(ctx: StateContext<Puzzles>, action: AddPuzzles) {
    const state = ctx.getState();

    let puzzlesAvailable = (PuzzlesState.maxPuzzles - state[action.catId].length);
    let numPuzzlesToAdd = puzzlesAvailable > action.numPuzzles? action.numPuzzles: puzzlesAvailable;

    let newPuzzles: Puzzle[] = [];
    for(let i = 0; i < numPuzzlesToAdd; i++) {
      newPuzzles.push({
        line1: '',
        line2: '',
        line3: '',
        line4: '',
      });
    }

    ctx.setState({
        ...state,
        [action.catId]: [...state[action.catId], ...newPuzzles]
    });

    return numPuzzlesToAdd;
  }
  
  @Action(SetPuzzleAnswerLine)
  setLine(ctx: StateContext<Puzzles>, action: SetPuzzleAnswerLine) {
    const state = ctx.getState();
    
    let index = state[action.catId].findIndex(puzzle=>puzzle===action.puzzle);
    let puzzle = { ...state[action.catId][index] };

    switch(action.line) {
      case 0: { puzzle.line1 = action.answer; break; }
      case 1: { puzzle.line2 = action.answer; break; }
      case 2: { puzzle.line3 = action.answer; break; }
      case 3: { puzzle.line4 = action.answer; break; }
      default: { break; }
    }

    let newState = [...state[action.catId]];
    newState[index] = puzzle;

    ctx.setState({
      ...state,
      [action.catId]: newState
    });
  }
}