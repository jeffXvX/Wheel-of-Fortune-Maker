import { Component, OnInit } from '@angular/core';
import { Puzzles } from './puzzles.model';

@Component({
  selector: 'wof-puzzles',
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {
  puzzles: Puzzles;

  constructor() { }

  ngOnInit() {
    this.puzzles = { categories: [] };

    this.puzzles.categories.push({
      name:'Category 1',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 2',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 3',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 4',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 5',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 6',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 7',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 8',
      puzzles: []
    });
    this.puzzles.categories.push({
      name:'Category 9',
      puzzles: []
    });
    
  }

}
