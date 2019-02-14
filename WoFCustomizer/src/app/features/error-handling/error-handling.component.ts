import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppErrorCode, AppErrorStatus, AppError } from './error/error.model';

@Component({
  selector: 'wof-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandlingComponent implements OnInit {
  errors$: Observable<AppError[]>;

  hasErrors$: Observable<boolean>;

  constructor(private errorService: ErrorHandlingService) { }

  ngOnInit() {
    this.errors$ = this.errorService.errors$;

    this.hasErrors$ = this.errors$.pipe(
      map(errors=>errors.length> 0));
  }

  addTestError() {
    this.errorService.newError({
      code: AppErrorCode.TEST,
      status: AppErrorStatus.UNREAD,
      message: 'Test Error'
    });
  }

}
