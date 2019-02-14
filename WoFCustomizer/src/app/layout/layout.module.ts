import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { GameModule } from '../features/game/game.module';
import { FilesModule } from '../features/files/files.module';
import { ConfigModule } from '../features/config/config.module';
import { HomeModule } from '../features/home/home.module';
import { RomModule } from '../features/rom/rom.module';
import { ErrorHandlingModule } from '../features/error-handling/error-handling.module';
import { DialogHandlingModule } from '../features/dialog-handling/dialog-handling.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HomeModule,
    GameModule,
    FilesModule,
    ConfigModule,
    RomModule,
    ErrorHandlingModule,
    DialogHandlingModule
  ],
  exports: [LayoutComponent]
})
export class WoFLayoutModule { }
