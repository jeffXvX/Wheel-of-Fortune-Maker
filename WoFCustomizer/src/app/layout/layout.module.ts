import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { ConfigModule } from '../features/config/config.module';
import { HomeModule } from '../features/home/home.module';
import { RomModule } from '../features/rom/rom.module';
import { ErrorHandlingModule } from '../features/error-handling/error-handling.module';
import { DialogHandlingModule } from '../features/dialog-handling/dialog-handling.module';
import { GameFormModule } from '../features/game-form/game-form.module';
import { CategoriesFormModule } from '../features/categories-form/categories-form.module';
import { LayoutService } from './layout.service';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    HomeModule,
    ConfigModule,
    RomModule,
    ErrorHandlingModule,
    DialogHandlingModule,

    GameFormModule,
    CategoriesFormModule,
  ],
  exports: [LayoutComponent],
  providers:[LayoutService]
})
export class WoFLayoutModule { }
