import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { GameModule } from '../features/game/game.module';
import { FilesModule } from '../features/files/files.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    GameModule,
    FilesModule
  ],
  exports: [LayoutComponent]
})
export class WoFLayoutModule { }
