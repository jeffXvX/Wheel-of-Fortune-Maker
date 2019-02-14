import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ErrorHandlingState } from './error-handling.state';
import { Observable } from 'rxjs';
import { AppError } from './error/error.model';
import { NewError } from './error-handling.actions';
import { DialogHandlingService } from '../dialog-handling/dialog-handling.service';

@Injectable()
export class ErrorHandlingService {
  @Select(ErrorHandlingState.errors) errors$: Observable<AppError[]>;

  constructor(
    private store: Store, 
    private dialogService: DialogHandlingService, ) { }

  newError(error: AppError, showDialog?: boolean) {
    this.store.dispatch(new NewError(error));
    
    if(showDialog){
      this.dialogService.showErrorDialog(error); 
    }
  }
}
