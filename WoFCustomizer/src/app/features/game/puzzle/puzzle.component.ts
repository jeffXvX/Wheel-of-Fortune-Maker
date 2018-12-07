import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Puzzle, line1MaxLength, line2MaxLength, line3MaxLength, line4MaxLength } from './puzzle.model';
import { PuzzleService } from './puzzle.service';

@Component({
  selector: 'wof-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzleComponent implements OnInit {
  @Input() puzzle: Puzzle;
  @Input() puzzleNum: number = 0;
  @Input() categoryId: number;

  panelOpenState = false;

  static ellipsis = '...';

  constructor(private puzzleService: PuzzleService) {}

  ngOnInit() {}

  deletePuzzle() {
    this.puzzleService.deletePuzzle(this.categoryId, this.puzzle);
  }

  /**
   * Find the first line that isn't empty and return it
   * to display when the puzzle is collapsed.
   */
  firstNonEmptyLine() {    
      if(this.puzzle.line1.length > 0) {
        return this.puzzle.line1 + PuzzleComponent.ellipsis;
      }
      else if(this.puzzle.line2.length > 0) {
        return this.puzzle.line2 + PuzzleComponent.ellipsis;
      }
      else if(this.puzzle.line3.length > 0) {
        return this.puzzle.line3 + PuzzleComponent.ellipsis;
      }
      else if(this.puzzle.line4.length > 0) {
        return this.puzzle.line4 + PuzzleComponent.ellipsis;
      }
      else {
        return '[Empty Puzzle]' + PuzzleComponent.ellipsis;
      }
  }

  line1Change(e) {
    this.puzzleService.setAnswerLine(
      this.categoryId,
      this.puzzle, 
      0, 
      e.target.value.toUpperCase());
  }

  line2Change(e) {
    this.puzzleService.setAnswerLine(
      this.categoryId,
      this.puzzle, 
      1, 
      e.target.value.toUpperCase());
  }

  line3Change(e) {
    this.puzzleService.setAnswerLine(
      this.categoryId,
      this.puzzle, 
      2, 
      e.target.value.toUpperCase());
  }

  line4Change(e) {
    this.puzzleService.setAnswerLine(
      this.categoryId,
      this.puzzle, 
      3, 
      e.target.value.toUpperCase());
  }

}
