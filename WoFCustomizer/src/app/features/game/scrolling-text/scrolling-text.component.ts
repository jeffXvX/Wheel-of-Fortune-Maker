import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'wof-scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ScrollingTextComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollingTextComponent implements ControlValueAccessor {
  @Input() maxLength = 0;
  
  text: string;

  private onChanged: (text:string)=>void;
  private onTouched: ()=>void;

  writeValue(text: string): void {
    this.text = text;
    this.cdRef.markForCheck();
  }

  registerOnChange(onChanged: (text:string)=>void): void {
    this.onChanged = onChanged;
  }

  registerOnTouched(onTouched: ()=>void): void {
    this.onTouched = onTouched;
  }

  onScrollingTextChange(e: {target: {value: string}}) {
    this.text = e.target.value;
    this.onChanged(this.text);
    this.cdRef.markForCheck();
  }

  constructor(private cdRef: ChangeDetectorRef) { }

}
