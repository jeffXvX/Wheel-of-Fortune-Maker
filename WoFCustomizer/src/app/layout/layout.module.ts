import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { PuzzlesModule } from '../features/puzzles/puzzles.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    PuzzlesModule
  ],
  exports: [LayoutComponent]
})
export class WoFLayoutModule { }
