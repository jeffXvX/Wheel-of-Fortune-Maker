import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[wofPuzzleInputFilter]'
})
export class PuzzleInputFilterDirective {

  constructor(private el: ElementRef) { }

  @Input() onlyLetters: boolean;

  /**
   * Characters are already cast to uppercase with
   * style="text-transform:uppercase" in the <input>
   * element so this filter only needs to whitelist
   * upper case letters, -,', and navigation keys.
   * 
   * All other characters should be discarded by the
   * filter.
   * 
   * @param event The event fired by pressing a key. 
   */
  @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
    console.log(`key: ${event.keyCode}`);
    if(
      (event.keyCode >= 65 && event.keyCode <= 90) ||  // A-Z
      (event.keyCode == 32) ||  // \s
      (event.keyCode == 222) ||  // '
      (event.keyCode == 189 || event.keyCode == 109) ||  // - & Numpad -
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
