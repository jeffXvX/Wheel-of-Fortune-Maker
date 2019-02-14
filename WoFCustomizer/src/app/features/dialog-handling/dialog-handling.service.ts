import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppError } from '../error-handling/error/error.model';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

@Injectable()
export class DialogHandlingService {

  constructor(private mDialogService: MatDialog) { }

  showErrorDialog(error: AppError) {
    const dialogRef = this.mDialogService.open(ErrorDialogComponent,{
      width: '250px',
      data: error
    });
  }
}
