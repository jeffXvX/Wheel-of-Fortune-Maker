import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetPuzzleAnswerLine } from './puzzles.actions';
import { Puzzle } from './puzzle.model';

@Injectable()
export class PuzzleService {

  constructor(private store: Store) { }

  setAnswerLine(categoryId: number, puzzle: Puzzle, line: number, answer: string) {
    this.store.dispatch(new SetPuzzleAnswerLine(categoryId, puzzle, line, answer));
  }  
}
