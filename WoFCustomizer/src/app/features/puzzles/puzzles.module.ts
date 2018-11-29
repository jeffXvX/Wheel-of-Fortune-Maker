import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzlesComponent } from './puzzles.component';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { CategoryComponent } from './category/category.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

@NgModule({
  declarations: [PuzzlesComponent, CategoryComponent, PuzzleComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports: [PuzzlesComponent]
})
export class PuzzlesModule { }
