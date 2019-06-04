import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from 'src/app/material-components/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { CategoriesFormComponent } from './categories-form.component';
import { CategoryControlComponent } from './category-control/category-control.component';
import { PuzzlesFormModule } from '../puzzles-form/puzzles-form.module';

@NgModule({
  declarations: [CategoriesFormComponent, CategoryControlComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    PuzzlesFormModule,
  ],
  exports: [CategoriesFormComponent]
})
export class CategoriesFormModule { }
