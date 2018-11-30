import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { CategoryComponent } from './category/category.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { GameService } from './game.service';
import { CategoryService } from './category/category.service';
import { PuzzleService } from './puzzle/puzzle.service';

@NgModule({
  declarations: [GameComponent, CategoryComponent, PuzzleComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports: [GameComponent],
  providers: [GameService, CategoryService, PuzzleService]
})
export class GameModule { }
