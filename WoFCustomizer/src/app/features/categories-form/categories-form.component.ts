import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Category } from '../game/category/category.model';
import { CategoriesFormState } from './categories-form.state';
import { Select } from '@ngxs/store';
import { first } from 'rxjs/operators';
import { CategoriesFormModel } from './categories-form.model';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'wof-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  categoriesForm: FormGroup;

  @Select(CategoriesFormState.state) form$: Observable<CategoriesFormModel>;

  get categories() {
    return (this.categoriesForm.get('categories') as FormArray).controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form$.pipe(first()).subscribe(f=>{ 
      console.log('form state:',f);

      this.categoriesForm = this.fb.group({
        categories: this.fb.array(f.model.categories.map(cat=>this.fb.control(cat)))
      });
  
    });

    this.categoriesForm.valueChanges.subscribe(c=>{
      console.log('cat form changes', c);
    })
  }
  
  numPuzzlesToAdd = 1;

  addPuzzles$ = new Subject<{catId: number, num: number}>();

  onPuzzlesToAddChange(e) {
    this.numPuzzlesToAdd = e.target.value;
  }

  addPuzzles(id: number) {
    this.addPuzzles$.next({
      catId: id,
      num: this.numPuzzlesToAdd
    });
  }

  onSubmit() {
    console.log('catgories form:',this.categoriesForm.value);
  }

}
