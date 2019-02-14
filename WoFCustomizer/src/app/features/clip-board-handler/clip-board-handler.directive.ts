import { Directive, Input, Output, EventEmitter, HostListener } from "@angular/core";

/**
 * Simple directive that allows a clickable element to 
 * copy a specified string to the users clipboard.
 */
@Directive({ 
  selector: '[clipboard-text]' 
})
export class ClipBoardHandlerDirective {

  @Input("clipboard-text")
  public text: string;

  @Output("copied")
  public copied: EventEmitter<string> = new EventEmitter<string>();

  @HostListener("click", ["$event"])
  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.text)
      return;

    let listener = (e: ClipboardEvent) => {
      let clipboard = e.clipboardData || window["clipboardData"];
      clipboard.setData("text", this.text.toString());
      e.preventDefault();

      this.copied.emit(this.text);
    };

    document.addEventListener("copy", listener, false)
    document.execCommand("copy");
    document.removeEventListener("copy", listener, false);
  }
}