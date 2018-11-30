import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetPuzzleAnswerLine } from './puzzles.actions';
import { Puzzle } from './puzzle.model';

@Injectable()
export class PuzzleService {

  constructor(private store: Store) { }

  setAnswerLine(puzzle: Puzzle, line: number, answer: string) {
    this.store.dispatch(new SetPuzzleAnswerLine(puzzle, line, answer));
  }  
}
