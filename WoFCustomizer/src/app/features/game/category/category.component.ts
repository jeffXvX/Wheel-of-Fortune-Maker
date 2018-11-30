import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { Puzzle } from '../puzzle/puzzle.model';

@Component({
  selector: 'wof-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  puzzles$: Observable<Puzzle[]>;
  
  numPuzzlesToAdd = 1;
  maxPuzzles = 255;
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.puzzles$ = this.categoryService.puzzles$(this.category.id);
  }

  onPuzzlesToAddChange(e) {
    this.numPuzzlesToAdd = e.target.value; 
  }

  onNameChange(e) {
    this.categoryService.changeCategoryName(this.category, e.target.value);
  }

  addPuzzles() {
    this.categoryService.addPuzzles(this.category.id, this.numPuzzlesToAdd);
  }

}
