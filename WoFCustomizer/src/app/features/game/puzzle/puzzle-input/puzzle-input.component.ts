import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Puzzle } from '../puzzle.model';

@Component({
  selector: 'wof-puzzle-input',
  templateUrl: './puzzle-input.component.html',
  styleUrls: ['./puzzle-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PuzzleInputComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzleInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  // @Input() puzzle: Puzzle;
  // @Input() puzzleNum: number = 0;
  // @Input() categoryId: number;

  // @Output() puzzleChanged = new EventEmitter<string[]>();

  //answer: string;
  //initialAnswer: string = '';

  onChange: (puzzle: Puzzle)=>void;
  onTouched: ()=>void;

  text$ = new Subject<string>();

  onInputText$ = new Subject<string[]>();
  ttpSub: Subscription;

  textToPuzzle$ = this.onInputText$.pipe(
    debounceTime(50),
    map(this.textToPuzzle)
  );



  textToPuzzle(text:string[]) {
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

  // should be InputEvent but not defined in this version of ts???
  onInput(e: { target: { value: string }, preventDefault: ()=>null }) {
    let puzzleText = e.target.value.toUpperCase().split('\n');
    this.onInputText$.next(puzzleText);
  }

  onFocus(e: { target: { value: string }, preventDefault: ()=>null }) {
    //let puzzleText = e.target.value.toUpperCase().split('\n');
    //this.puzzleChanged.emit(puzzleText);
    this.onTouched();
  }

  ngOnInit() {
    this.ttpSub = this.textToPuzzle$.subscribe(this.onChange);
  }

  ngOnDestroy() {
    if(!this.ttpSub.closed) {
      this.ttpSub.unsubscribe();
    }
  }

  writeValue(puzzle: Puzzle) {
    this.text$.next(this.puzzleToText(puzzle));
  }

  puzzleToText(puzzle: Puzzle) {
    let text = '';
    puzzle.line1 ? text += puzzle.line1 : null;
    puzzle.line2 ? text += '\n' + puzzle.line2 : null;
    puzzle.line3 ? text += '\n' + puzzle.line3 : null;
    puzzle.line4 ? text += '\n' + puzzle.line4 : null;
    return text;
  }

  registerOnChange(onChange: (puzzle: Puzzle)=>void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: ()=>void) {
    this.onTouched = onTouched;
  }

}
