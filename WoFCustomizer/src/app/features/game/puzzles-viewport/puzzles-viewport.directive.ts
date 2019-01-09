import { ViewportRuler } from '@angular/cdk/scrolling';
import { Directive } from '@angular/core';


/**
 * This was going to be used to solve the issues with 
 * the cdk scroll viewport as documented in category.component.html 
 * but it turns out to not be necessasry at this time. 
 * 
 * So for now this is unused although it might some day be 
 * useful so I won't delete it for now.
 */
@Directive({
  selector: 'ul[wofPuzzlesViewport]'
})
export class PuzzlesViewportDirective {

  constructor(private ruler: ViewportRuler) { }

  ngOnInit() {
    console.log(`viewport: ${this.ruler.getViewportSize().height}`);
    this.ruler.change().subscribe(v=>console.log(`change: ${this.ruler.getViewportSize().height}`));
  }

}
