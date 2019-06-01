import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'wof-title-screen-text',
  templateUrl: './title-screen-text.component.html',
  styleUrls: ['./title-screen-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TitleScreenTextComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleScreenTextComponent implements ControlValueAccessor {
  @Input() maxLength = 0;
  
  line1: string;
  line2: string;
  line3: string;

  private onChanged: (text:string[])=>void;
  private onTouched: ()=>void;

  writeValue(titleScreenText: string[]) {
    this.line1 = titleScreenText[0] || '';
    this.line2 = titleScreenText[1] || '';
    this.line3 = titleScreenText[2] || '';
    this.cdRef.markForCheck();
  }

  registerOnChange(onChanged: (text:string[])=>void) {
    this.onChanged = onChanged;
  }

  registerOnTouched(onTouched: ()=>void) {
    this.onTouched = onTouched;
  }

  onFocus() {
    this.onTouched();
  }
  
  onLine1Change(e: { target: {value: string }}) {
    this.line1 = e.target.value;
    this.onLinesChanged();  
  }

  onLine2Change(e: { target: {value: string }}) {
    this.line2 = e.target.value;
    this.onLinesChanged();  
  }

  onLine3Change(e: { target: {value: string }}) {
    this.line3 = e.target.value;
    this.onLinesChanged();
  }

  onLinesChanged() {
    this.onChanged([this.line1, this.line2, this.line3]);
    this.cdRef.markForCheck();
  }

  constructor(private cdRef: ChangeDetectorRef) { }
}
