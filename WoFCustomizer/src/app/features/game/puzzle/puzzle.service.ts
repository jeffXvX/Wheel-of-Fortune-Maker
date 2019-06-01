import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetPuzzleAnswerLine, DeletePuzzle, SetPuzzleAnswer } from '../puzzles/puzzles.actions';
import { Puzzle } from './puzzle.model';

@Injectable()
export class PuzzleService {

  constructor(private store: Store) { }

  setAnswerLine(categoryId: number, puzzle: Puzzle, line: number, answer: string) {
    this.store.dispatch(new SetPuzzleAnswerLine(categoryId, puzzle, line, answer));
  }
  
  setAnswer(categoryId: number, puzzle: Puzzle, newAnswer: string[]) {
    this.store.dispatch(new SetPuzzleAnswer(categoryId, puzzle, newAnswer));
  }

  deletePuzzle(catId: number, puzzle: Puzzle) {
    this.store.dispatch(new DeletePuzzle(catId, puzzle));
  }
}
