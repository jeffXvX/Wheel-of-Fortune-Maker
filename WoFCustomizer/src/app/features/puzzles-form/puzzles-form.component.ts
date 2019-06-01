import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { PuzzlesFormState } from './puzzles-form.state';
import { PuzzlesFormModel } from './puzzles-form.model';

@Component({
  selector: 'wof-puzzles-form',
  templateUrl: './puzzles-form.component.html',
  styleUrls: ['./puzzles-form.component.css']
})
export class PuzzlesFormComponent implements OnInit {
  @Input() categoryId: number;

  @Input() set puzzlesToAdd(e: { catId: number, num: number}) {
    if(e && e.catId === this.categoryId) {
      for(let i=0;i<e.num;i++){
        (this.puzzlesForm.get('puzzles') as FormArray).push(
          this.fb.control({
            line1:'',
            line2:'',
            line3:'',
            line4:''
          }));
      }
    }
  }

  @Select(PuzzlesFormState.form) form$: Observable<PuzzlesFormModel>;

  puzzlesForm: FormGroup;

  previewingText: string[];

  get puzzles() {
    return (this.puzzlesForm.get('puzzles') as FormArray).controls;
  }
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log('Puzzle Form for cat ',this.categoryId);
    this.form$.pipe(first()).subscribe(form=>{
      console.log('building puzzles form array', form[this.categoryId]);
      if(form[this.categoryId]){
        this.puzzlesForm = this.fb.group({
          'puzzles' : this.fb.array(form[this.categoryId].model.puzzles.map(puzzle=>this.fb.control(puzzle)))
        });
      }
      console.log('puzzles form:',this.puzzlesForm);
    });

  }

  onPuzzleUpdates(puzzleText: string[]) {
    console.log('puzzle update', puzzleText);
    this.previewingText = puzzleText;
  }

  onSubmit() {
    let sub = 
    this.form$.subscribe(form=>{
      console.log('Puzzles form:', form);
      sub.unsubscribe();
    });
  }


  trackPuzzleFn(index, item) {
    return index;
  }

}
