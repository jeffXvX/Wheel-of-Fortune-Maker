import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
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
import { PuzzleInputComponent } from './puzzle/puzzle-input/puzzle-input.component';
import { PuzzleInputFormatFilterDirective } from './puzzle/puzzle-input/puzzle-input-format-filter/puzzle-input-format-filter.directive';
import { PuzzlePreviewComponent } from './puzzle/puzzle-preview/puzzle-preview.component';
import { TitleScreenTextComponent } from './title-screen-text/title-screen-text.component';
import { ScrollingTextComponent } from './scrolling-text/scrolling-text.component';

@NgModule({
  declarations: [
    GameComponent, 
    CategoryComponent, 
    PuzzleComponent, 
    PuzzlesViewportDirective, 
    PuzzleInputFilterDirective, 
    CategoriesComponent,
    PuzzleInputComponent,
    PuzzleInputFormatFilterDirective,
    PuzzlePreviewComponent,
    TitleScreenTextComponent,
    ScrollingTextComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    MaterialComponentsModule,
    GameValidatorModule
  ],
  exports: [GameComponent, CategoriesComponent],
  providers: [GameService, CategoryService, PuzzleService]
})
export class GameModule { }
