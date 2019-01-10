import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Category, maxPuzzlesPerCategory } from './category.model';
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
  numPuzzles$: Observable<number>;

  numPuzzlesToAdd = 1;
  maxPuzzles = maxPuzzlesPerCategory;
  
  constructor(
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.puzzles$ = this.categoryService.puzzles$(this.category.id);
    this.numPuzzles$ = this.categoryService.numPuzzles$(this.category.id);
  }

  onPuzzlesToAddChange(e) {
    this.numPuzzlesToAdd = e.target.value; 
  }

  onNameChange(e) {
    this.categoryService.changeCategoryName(this.category, e.target.value);
  }

  /**
   * 
   * The max number of puzzles to add should probably be enforced
   * by the store but for the moment I'll just enforce it here.
   * 
   * It's not completely optimal but can be revisited in the future
   * if necessary.
   */
  addPuzzles() {
    this.categoryService.addPuzzles(this.category.id, this.numPuzzlesToAdd);
  }

  onSubmit(e) {
    e.preventDefault();
  }

}
