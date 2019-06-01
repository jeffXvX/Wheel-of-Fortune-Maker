import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { PuzzlesFormComponent } from './puzzles-form.component';
import { PuzzleControlComponent } from './puzzle-control/puzzle-control.component';
import { PuzzlePreviewComponent } from './puzzle-preview/puzzle-preview.component';

@NgModule({
  declarations: [PuzzlesFormComponent, PuzzleControlComponent, PuzzlePreviewComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
  ],
  exports: [PuzzlesFormComponent]
})
export class PuzzlesFormModule { }
