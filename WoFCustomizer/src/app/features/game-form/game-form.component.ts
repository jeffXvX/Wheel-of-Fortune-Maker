import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RomConstantsService } from '../rom/rom-constants/rom-constants.service';

@Component({
  selector: 'wof-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  gameFormGroup: FormGroup;
  scrollingTextLength$: Observable<number>;
  introTextLength$: Observable<number>;
  
  constructor(
    private fb: FormBuilder, 
    private constsService: RomConstantsService) {

    this.scrollingTextLength$ = this.constsService.romConstants$.pipe(
      map(constants=>constants.titleScrollingTextLength));

    this.introTextLength$ = this.constsService.romConstants$.pipe(
      map(constants=>constants.introTextLength));
  }

  ngOnInit() {
    this.gameFormGroup = this.fb.group({
      id: [null],
      name: [null],
      scrollingText: [''],
      introText: [['','','']],
      categoryIds: [[]]
    })
  }

  onSubmit() {
    console.log('OnSubmit:',this.gameFormGroup.value);
  }
}
