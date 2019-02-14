import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppError } from '../../../error-handling/error/error.model';

@Component({
  selector: 'wof-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppError) { }

  ngOnInit() {
  }

  onClose() {
    if(this.dialogRef){
      this.dialogRef.close();
    }
  }
}
