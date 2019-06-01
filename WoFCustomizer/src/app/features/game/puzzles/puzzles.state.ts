import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Puzzle, line1MaxLength, line2MaxLength, line3MaxLength, line4MaxLength } from '../puzzle/puzzle.model';
import { AddPuzzles, SetPuzzleAnswerLine, DeletePuzzle, SetPuzzles, ResetPuzzles, SetPuzzleAnswer } from './puzzles.actions';
import { Puzzles } from './puzzles.model';
import { maxPuzzlesPerCategory } from '../category/category.model';
import { defaultPuzzle } from '../puzzle/default-puzzle.model';

@State<Puzzles>({
  name: 'puzzles',
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

  /**
   * This selector is totalling all the characters used
   * across all puzzle answers.  It might become a 
   * performance issue once a game is fully filled out 
   * so if that is the case it will need to be reworked 
   * as a background task instead of a selector.
   * 
   * But for now the simplest version will be fine.
   */
  @Selector() static characterUsed(state: Puzzles) {
    return Object.keys(state).reduce(
      (totalCharacters: number, columnId: string)=>{
        totalCharacters += (state[columnId] as Puzzle[]).reduce(
            (characters: number, puzzle:Puzzle)=>{
              characters += puzzle.line1.length + puzzle.line2.length + puzzle.line3.length + puzzle.line4.length; 
              return characters;
            },0);
        return totalCharacters;
      }, 0);
  }

  @Selector() static numPuzzles(state: Puzzles) {
    return (categoryId: number) => {
      let length = 0;
      if(state[categoryId]) { length = state[categoryId].length; }
      return length;
    }
  }

  @Action(ResetPuzzles)
  ResetPuzzles(ctx: StateContext<Puzzles>) {
    ctx.setState({});
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
      newPuzzles.push(defaultPuzzle());
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

  @Action(SetPuzzleAnswer)
  setAnswer(ctx: StateContext<Puzzles>, action: SetPuzzleAnswer) {
    console.log('Setting answer:', action.answer);
    const state = ctx.getState();
    const index = state[action.catId].findIndex(puzzle=>puzzle===action.puzzle);
    const puzzle = { ...state[action.catId][index] };
    const newState = [...state[action.catId]];

    switch(action.answer.length) {
      case 0: { 
        puzzle.line1 = ''; 
        puzzle.line2 = ''; 
        puzzle.line3 = ''; 
        puzzle.line4 = ''; 
        break; 
      }
      case 1: { 
        puzzle.line1 = ''; 
        puzzle.line2 = action.answer[0].substr(0,line2MaxLength); 
        puzzle.line3 = ''; 
        puzzle.line4 = ''; 
        break; 
      }
      case 2: { 
        puzzle.line1 = ''; 
        puzzle.line2 = action.answer[0].substr(0,line2MaxLength); 
        puzzle.line3 = action.answer[1].substr(0,line3MaxLength);
        puzzle.line4 = ''; 
        break; 
      }
      case 3: { 
        puzzle.line1 = action.answer[0].substr(0,line1MaxLength);
        puzzle.line2 = action.answer[1].substr(0,line2MaxLength); 
        puzzle.line3 = action.answer[2].substr(0,line3MaxLength);
        puzzle.line4 = ''; 
        break; 
      }
      case 4: { 
        puzzle.line1 = action.answer[0].substr(0,line1MaxLength);
        puzzle.line2 = action.answer[1].substr(0,line2MaxLength);
        puzzle.line3 = action.answer[2].substr(0,line3MaxLength);
        puzzle.line4 = action.answer[3].substr(0,line4MaxLength);
        break; 
      }
      default: { break; }
    }

    console.log('Puzzle:', puzzle);

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