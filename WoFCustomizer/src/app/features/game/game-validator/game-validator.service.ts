import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoriesService } from './../categories/categories.service';
import { GameService } from './../game.service';
import { PuzzleService } from '../puzzle/puzzle.service';
import { Puzzles } from '../puzzles/puzzles.model';
import { Puzzle } from '../puzzle/puzzle.model';

@Injectable()
export class GameValidatorService {
  static maxCharacters = 30130;
  static puzzlesRequired = 1001;

  constructor(
    private store: Store,
    private gameService: GameService, 
    private categoriesService: CategoriesService, 
    private puzzzleService: PuzzleService) {
    }

  /**
   * Calculate the total number of characters used 
   * inside a set of puzzles.
   * 
   * Currently this is done in a selector inside the
   * PuzzlesState but if performance issues make the 
   * selector unusable this version can be tied as a 
   * background process or maybe even the click event 
   * of the game tab.  For now this is just dead code. 
   * @param puzzles 
   */
  calculateCharacters(puzzles: Puzzles) {
    Object.keys(puzzles).reduce((totalCharacters: number, categoryId)=>{
      totalCharacters += puzzles[categoryId].reduce((characters: number, puzzle: Puzzle) => {
        characters += puzzle.line1.length + puzzle.line2.length + puzzle.line3.length + puzzle.line4.length;
        return characters;
      },0);
      return totalCharacters;
    }, 0)
  }

  /**
   * 
   */
  checkForDuplicatePuzzles(puzzles: Puzzles) {}

  
}

