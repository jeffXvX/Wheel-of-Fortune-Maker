import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { GameModule } from '../features/game/game.module';
import { FilesModule } from '../features/files/files.module';
import { ConfigModule } from '../features/config/config.module';
import { HomeModule } from '../features/home/home.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HomeModule,
    GameModule,
    FilesModule,
    ConfigModule
  ],
  exports: [LayoutComponent]
})
export class WoFLayoutModule { }
