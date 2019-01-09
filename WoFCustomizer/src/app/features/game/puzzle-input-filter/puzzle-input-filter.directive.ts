import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[wofPuzzleInputFilter]'
})
export class PuzzleInputFilterDirective {

  constructor(private el: ElementRef) { }

  @Input() onlyLetters: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
    //console.log(`key: ${event.keyCode}`);
    if(
      (event.keyCode >= 65 && event.keyCode <= 90) ||  // A-Z
      (event.keyCode >= 97 && event.keyCode <= 122) ||  // a-z
      (event.keyCode == 32) ||  // \s
      (event.keyCode == 222) ||  // '
      (event.keyCode == 189) ||  // -
      (event.keyCode == 9) || // TAB
      (event.keyCode == 37 || event.keyCode == 39) || // left & right arrow
      (event.keyCode == 8)  // BS
    ) {
      return;
    }
    else {
      event.preventDefault();
    }

  }
}
