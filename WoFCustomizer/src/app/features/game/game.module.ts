import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { GameValidatorModule } from './game-validator/game-validator.module';
import { CategoryComponent } from './category/category.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { GameService } from './game.service';
import { CategoryService } from './category/category.service';
import { PuzzleService } from './puzzle/puzzle.service';
import { PuzzlesViewportDirective } from './puzzles-viewport/puzzles-viewport.directive';
import { PuzzleInputFilterDirective } from './puzzle-input-filter/puzzle-input-filter.directive';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [GameComponent, CategoryComponent, PuzzleComponent, PuzzlesViewportDirective, PuzzleInputFilterDirective, CategoriesComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    GameValidatorModule
  ],
  exports: [GameComponent, CategoriesComponent],
  providers: [GameService, CategoryService, PuzzleService]
})
export class GameModule { }
