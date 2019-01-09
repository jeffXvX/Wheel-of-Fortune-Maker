import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { MaterialComponentsModule } from '../../material-components/material-components.module';

@NgModule({
  declarations: [HomeComponent, InstructionsComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports:[ HomeComponent ]
})
export class HomeModule { }
