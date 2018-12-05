import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[wofPuzzleInputFilter]'
})
export class PuzzleInputFilterDirective {

  constructor(private el: ElementRef) { }

  @Input() onlyLetters: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
    //console.log(`keycode: ${event.keyCode}`)
    if(
      (event.keyCode >= 65 && event.keyCode <= 90) ||  // A-Z
      (event.keyCode >= 97 && event.keyCode <= 122) ||  // a-z
      (event.keyCode == 32) ||  // \s
      (event.keyCode == 222) ||  // '
      (event.keyCode == 189) ||  // -
      (event.keyCode == 8)  // BS
    ) {
      return;
    }
    else {
      event.preventDefault();
    }

    /*
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if (((e.keyCode < 65 || e.keyCode > 90)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }   
    */
  }
}
