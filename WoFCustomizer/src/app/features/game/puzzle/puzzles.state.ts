import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Puzzle, line1MaxLength, line2MaxLength, line3MaxLength, line4MaxLength } from './puzzle.model';
import { AddPuzzles, SetPuzzleAnswerLine, DeletePuzzle, SetPuzzles } from './puzzles.actions';
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
    return state;
  }

  @Selector() static puzzlesByCategoryId(state: Puzzles) {
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

  @Action(SetPuzzles)
  SetPuzzles(ctx: StateContext<Puzzles>, action: SetPuzzles) {
    ctx.setState(action.puzzles);
  }

  @Action(AddPuzzles)
  addPuzzles(ctx: StateContext<Puzzles>, action: AddPuzzles) {
    const state = ctx.getState();
    const puzzlesAvailable = (PuzzlesState.maxPuzzles - state[action.catId].length);
    const numPuzzlesToAdd = puzzlesAvailable > action.numPuzzles? action.numPuzzles: puzzlesAvailable;
    const newPuzzles: Puzzle[] = [];

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
    const index = state[action.catId].findIndex(puzzle=>puzzle===action.puzzle);
    const puzzle = { ...state[action.catId][index] };
    const newState = [...state[action.catId]];

    switch(action.line) {
      case 0: { 
        
        puzzle.line1 = action.answer.substr(0,line1MaxLength); 
        break; 
      }
      case 1: { 
        puzzle.line2 = action.answer.substr(0,line2MaxLength); 
        break; 
      }
      case 2: { 
        puzzle.line3 = action.answer.substr(0,line3MaxLength);
        break; 
      }
      case 3: { 
        puzzle.line4 = action.answer.substr(0,line4MaxLength);
        break; 
      }
      default: { break; }
    }

    newState[index] = puzzle;

    ctx.setState({
      ...state,
      [action.catId]: newState
    });
  }

  @Action(DeletePuzzle)
  DeletePuzzle(ctx: StateContext<Puzzles>, action: DeletePuzzle) {
    const state = ctx.getState();
    const index = state[action.catId].findIndex(puzzle=>puzzle===action.puzzle);
    const newPuzzles = [...state[action.catId]];

    newPuzzles.splice(index,1);

    ctx.setState({
      ...state,
      [action.catId]: newPuzzles
    })
  }
  
}