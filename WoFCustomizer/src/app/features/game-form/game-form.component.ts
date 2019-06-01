import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'wof-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  gameFormGroup: FormGroup;
  
  constructor(private fb: FormBuilder) { }

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
