import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Puzzle } from '../../game/puzzle/puzzle.model';

@Component({
  selector: 'wof-puzzle-control',
  templateUrl: './puzzle-control.component.html',
  styleUrls: ['./puzzle-control.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PuzzleControlComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzleControlComponent implements ControlValueAccessor {

  @Output() puzzleUpdates = new EventEmitter<string[]>();

  private _control;
  @Input() set control(c) {
    this._control = c;
  } 

  @Input() idx;

  text: string;

  onChange: (puzzle: Puzzle)=>void;
  onTouched: ()=>void;

  onInput(e: { target: { value: string }, preventDefault: ()=>null }) {
    let puzzleText = e.target.value.toUpperCase().split('\n');
    console.log('puzzle text',puzzleText, ' for control ', this.idx, ' as ', this._control);
    this.puzzleUpdates.emit(puzzleText);
    this.onChange(this.textToPuzzle(puzzleText));
    this.text = e.target.value.toUpperCase();
    this.cdRef.markForCheck();
  }

  onFocus(e: { target: { value: string }, preventDefault: ()=>null }) {
    let puzzleText = e.target.value.toUpperCase().split('\n');
    this.puzzleUpdates.emit(puzzleText);
    this.onTouched();
  }

  writeValue(puzzle: Puzzle) {
    console.log('writing value', puzzle, ' to control ',this.idx ,' as ', this._control);
    this.text = this.puzzleToText(puzzle);
    this.cdRef.markForCheck();
  }

  registerOnChange(onChange: (puzzle: Puzzle)=>void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: ()=>void) {
    this.onTouched = onTouched;
  }

  private puzzleToText(puzzle: Puzzle) {
    let text = '';
    puzzle.line1 ? text += puzzle.line1 : null;
    puzzle.line2 ? text += '\n' + puzzle.line2 : null;
    puzzle.line3 ? text += '\n' + puzzle.line3 : null;
    puzzle.line4 ? text += '\n' + puzzle.line4 : null;
    return text;
  }

  private textToPuzzle(text:string[]) {
    let puzzle: Puzzle = {
      line1: '', 
      line2: '', 
      line3: '', 
      line4: '' 
    };

    switch(text.length) {
      case 0: { 
        break; 
      }
      case 1: { 
        puzzle.line2 = text[0].substr(0); 
        break; 
      }
      case 2: { 
        puzzle.line2 = text[0];
        puzzle.line3 = text[1];
        break; 
      }
      case 3: { 
        puzzle.line1 = text[0];
        puzzle.line2 = text[1];
        puzzle.line3 = text[2];
        break; 
      }
      case 4: { 
        puzzle.line1 = text[0];
        puzzle.line2 = text[1];
        puzzle.line3 = text[2];
        puzzle.line4 = text[3];
        break; 
      }
      default: { break; }
    }

    return puzzle;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

}
