import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { GameFormComponent } from './game-form.component';
import { ScrollingTextComponent } from './scrolling-text/scrolling-text.component';
import { TitleScreenTextComponent } from './title-screen-text/title-screen-text.component';

@NgModule({
  declarations: [GameFormComponent, ScrollingTextComponent, TitleScreenTextComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
  ],
  exports: [GameFormComponent]
})
export class GameFormModule { }
