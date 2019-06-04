import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'wof-puzzle-preview',
  templateUrl: './puzzle-preview.component.html',
  styleUrls: ['./puzzle-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzlePreviewComponent {

  @Input() set puzzleText(text:string[]) {
    this.formatPuzzle(text || []);
    //console.log(text.map(line=>line.split('')));
  }

  /**
   * The text formatted to fit the preview box.
   */
  private formattedPreviewText = [
    new Array(13).fill(' '),
    new Array(13).fill(' '),
    new Array(13).fill(' '),
    new Array(13).fill(' ')];

  /**
   * Emit the preview text to the view.
   */
  puzzleText$ = new BehaviorSubject<string[][]>(this.formattedPreviewText);


  /**
   * Format the puzzle solution text into the
   * preview solution box.
   * @param text The puzzle solution text lines.
   */
  formatPuzzle(text:string[]) {
    switch(text.length) {
      case 1: {
        this.formattedPreviewText[0] = this.buildNewTextArray('');
        this.formattedPreviewText[1] = this.buildNewTextArray(text[0]);
        this.formattedPreviewText[2] = this.buildNewTextArray('');
        this.formattedPreviewText[3] = this.buildNewTextArray('');
        this.puzzleText$.next([...this.formattedPreviewText]);
        break;
      }
      case 2: {
        this.formattedPreviewText[0] = this.buildNewTextArray('');
        this.formattedPreviewText[1] = this.buildNewTextArray(text[0]);
        this.formattedPreviewText[2] = this.buildNewTextArray(text[1]);
        this.formattedPreviewText[3] = this.buildNewTextArray('');
        this.puzzleText$.next([...this.formattedPreviewText]);
        break;
      }
      case 3: {
        this.formattedPreviewText[0] = this.buildNewTextArray(text[0]);
        this.formattedPreviewText[1] = this.buildNewTextArray(text[1]);
        this.formattedPreviewText[2] = this.buildNewTextArray(text[2]);
        this.formattedPreviewText[3] = this.buildNewTextArray('');
        this.puzzleText$.next([...this.formattedPreviewText]);
        break;
      }
      case 4: {
        this.formattedPreviewText[0] = this.buildNewTextArray(text[0]);
        this.formattedPreviewText[1] = this.buildNewTextArray(text[1]);
        this.formattedPreviewText[2] = this.buildNewTextArray(text[2]);
        this.formattedPreviewText[3] = this.buildNewTextArray(text[3]);
        this.puzzleText$.next([...this.formattedPreviewText]);
        break;
      }
      default: return;
    }
  }

  /**
   * Build an array of characters offset from the center
   * of the preview solution box line. 
   * @param text The string of text for the solution.
   * @param maxSize The max size of the puzzle box.
   */
  buildNewTextArray(text: string, maxSize: number = 13) {
    let firstIndex = this.calcOffsetPosition(text);
    let textArraySize = Math.max(maxSize, text.length);
    let textArray = Array(textArraySize).fill(' ', 0, textArraySize);
    textArray.splice(firstIndex, text.length, ...text.split(''));
    return textArray;
  }

  /**
   * Calculate the offset from the center.  WoF fills out the 
   * lines from the center based on the characters provided.
   * @param text The line of puzzle text
   * @param maxSize The max size of a line, should always be 13
   * for the WoF version we are targeting.
   */
  calcOffsetPosition(text: string, maxSize: number = 13) {
    //let odd = text.length % 2;
    let centerOffset = Math.floor(((maxSize - text.length) / 2) );
    let firstIndex = centerOffset < 0 ? 0 : centerOffset;
    return firstIndex;
  }
}
