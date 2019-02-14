import { NgModule } from '@angular/core';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { CommonModule } from '@angular/common';
import { ErrorHandlingService } from './error-handling.service';
import { ErrorHandlingComponent } from './error-handling.component';
import { ErrorComponent } from './error/error.component';
import { ClipBoardHandlerModule } from '../clip-board-handler/clip-board-handler.module';

@NgModule({
  declarations: [ErrorHandlingComponent, ErrorComponent],
  imports: [
    CommonModule,
    ClipBoardHandlerModule,
    MaterialComponentsModule
  ],
  exports: [ErrorHandlingComponent],
  providers:[ErrorHandlingService]
})
export class ErrorHandlingModule { }
