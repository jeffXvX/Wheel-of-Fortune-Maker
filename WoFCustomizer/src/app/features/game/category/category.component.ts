import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Category, maxPuzzlesPerCategory } from './category.model';
import { CategoryService } from './category.service';
import { Observable, Subscription } from 'rxjs';
import { Puzzle } from '../puzzle/puzzle.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'wof-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {
  //@Input() 
  category: Category;
  puzzles$: Observable<Puzzle[]>;
  numPuzzles$: Observable<number>;

  numPuzzlesToAdd = 1;
  maxPuzzles = maxPuzzlesPerCategory;

  categoryGroup = new FormGroup({
    name: new FormControl(''),
  });

  sub: Subscription;
  
  constructor(
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.sub = 
    this.categoryService.selectedCategory$.subscribe(c=>{
      this.category = c;
      this.puzzles$ = this.categoryService.puzzles$(this.category.id);
      this.numPuzzles$ = this.categoryService.numPuzzles$(this.category.id);
      console.log('cat selected', c)
    });
  }

  ngOnDestroy() {
    console.log('Destroying');
    this.sub.unsubscribe();
  }

  onPuzzlesToAddChange(e) {
    this.numPuzzlesToAdd = e.target.value; 
  }

  onNameChange(e) {
    //this.categoryService.changeCategoryName(this.category, e.target.value);
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
