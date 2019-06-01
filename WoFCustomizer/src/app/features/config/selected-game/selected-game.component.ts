import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'wof-selected-game',
  templateUrl: './selected-game.component.html',
  styleUrls: ['./selected-game.component.css']
})
export class SelectedGameComponent implements OnInit, ControlValueAccessor {

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

}
