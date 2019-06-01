import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '../../game/category/category.model';

@Component({
  selector: 'wof-category-control',
  templateUrl: './category-control.component.html',
  styleUrls: ['./category-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CategoryControlComponent,
    multi: true
  }],
})
export class CategoryControlComponent implements OnInit, ControlValueAccessor {

  onChange: (category: Category)=>void;
  onTouched: ()=>void;

  category: Category;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  writeValue(category: Category) {
    console.log(category);
    this.category = category;
    this.cdRef.markForCheck();
  }

  registerOnChange(onChange: (category: Category)=>void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: ()=>void) {
    this.onTouched = onTouched;
  }

  onInput(e: { target: { value: string }}) {
    this.onChange({
      name: e.target.value,
      id: this.category.id
    });
    this.cdRef.markForCheck();
  }

  onFocus() {
    this.onTouched();
  }

  addPuzzles() {}

}
