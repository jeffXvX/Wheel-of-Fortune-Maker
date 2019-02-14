import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ErrorHandlingState } from './error-handling.state';
import { Observable } from 'rxjs';
import { AppError } from './error/error.model';
import { NewError } from './error-handling.actions';

@Injectable()
export class ErrorHandlingService {
  @Select(ErrorHandlingState.errors) errors$: Observable<AppError[]>;

  constructor(private store: Store) { }

  newError(error: AppError) {
    this.store.dispatch(new NewError(error));
  }
}
