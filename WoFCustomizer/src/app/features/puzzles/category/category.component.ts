import { Component, OnInit, Input } from '@angular/core';
import { Category } from './category.model';
import { Puzzle } from '../puzzle/puzzle.model';

@Component({
  selector: 'wof-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  
  numPuzzlesToAdd = 1;

  maxPuzzles = 255;

  puzzles: string[] = new Array(10);
  
  constructor() { }

  ngOnInit() {
  }

  onPuzzlesToAddChange(e) {
    this.numPuzzlesToAdd = e.target.value; 
  }

  onNameChange(e) {
    this.category.name = e.target.value;
  }

  addPuzzles() {
    let newPuzzles = new Array<Puzzle>(Number(this.numPuzzlesToAdd)).fill({
      line1: '',
      line2: '',
      line3: '',
      line4: ''
    });
    this.category.puzzles.push(...newPuzzles);
  }

}
