import { Component, OnInit, Input } from '@angular/core';
import { Puzzle } from './puzzle.model';

@Component({
  selector: 'wof-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  @Input() puzzle: Puzzle;
  @Input() puzzleNum: number = 0;
  
  constructor() { }

  ngOnInit() {
  }

  line1Change(e) {
    this.puzzle.line1 = e.target.value;
  }

  line2Change(e) {
    this.puzzle.line2 = e.target.value;
  }

  line3Change(e) {
    this.puzzle.line3 = e.target.value;
  }

  line4Change(e) {
    this.puzzle.line4 = e.target.value;
  }

}
