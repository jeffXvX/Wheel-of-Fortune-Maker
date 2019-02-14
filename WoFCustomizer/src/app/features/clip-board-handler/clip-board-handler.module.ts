import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipBoardHandlerDirective } from './clip-board-handler.directive';

@NgModule({
  declarations: [ClipBoardHandlerDirective],
  imports: [
    CommonModule
  ],
  exports:[ClipBoardHandlerDirective]
})
export class ClipBoardHandlerModule { }
