import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Puzzle } from './puzzle.model';
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

  panelOpenState = false;
  
  constructor(private puzzleService: PuzzleService) {}

  ngOnInit() {}

  line1Change(e) {
    this.puzzleService.setAnswerLine(this.puzzle, 0, e.target.value);
    //this.puzzle.line1 = e.target.value;
  }

  line2Change(e) {
    this.puzzleService.setAnswerLine(this.puzzle, 1, e.target.value);
    //this.puzzle.line2 = e.target.value;
  }

  line3Change(e) {
    this.puzzleService.setAnswerLine(this.puzzle, 2, e.target.value);
    //this.puzzle.line3 = e.target.value;
  }

  line4Change(e) {
    this.puzzleService.setAnswerLine(this.puzzle, 3, e.target.value);
    //this.puzzle.line4 = e.target.value;
  }

}
