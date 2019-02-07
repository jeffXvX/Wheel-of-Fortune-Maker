import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'wof-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  dataUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    // just a quick and dirty fix for pulling in the instructions 
    if(!environment.production) {
      this.dataUrl = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/instructions/wof_instructions.html');
    }
    else {
      this.dataUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://jeffxvx.github.io/Wheel-of-Fortune-Maker/assets/instructions/wof_instructions.html');
    }
   }

  ngOnInit() {
  }

}
