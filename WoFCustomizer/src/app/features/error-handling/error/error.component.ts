import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AppError } from './error.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'wof-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  @Input() error: AppError;

  forClipboard: string;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forClipboard = `${this.error.code}: ${this.error.message}`;
  }

  /**
   * Inform the user that the error was copied to the clipboard
   */
  onErrorCopied() {
    this.snackBar.open(`Error copied to clipboard`, null, {
      duration: 1000,
    });
  }
}
