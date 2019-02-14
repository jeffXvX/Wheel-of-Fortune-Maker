import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../material-components/material-components.module';
import { DialogHandlingService } from './dialog-handling.service';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
  ],
  providers: [DialogHandlingService]
})
export class DialogHandlingModule { }
