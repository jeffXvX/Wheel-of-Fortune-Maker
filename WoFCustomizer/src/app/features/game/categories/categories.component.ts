import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'wof-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories>;
  categoriesControls$: Observable<FormControl[]>;

  categoriesControls = new FormArray([]);
  categoriesForm = new FormGroup({
    "categories": this.categoriesControls
  });

  constructor(private categoriesService: CategoriesService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.categories$;

    this.categoriesControls$ = 
      this.categories$.pipe(
        map(categories=>categories.map(category=>this.fb.control(category))));
    
    this.categoriesControls$.subscribe(controls=>{
      controls.forEach(c=>this.categoriesControls.push(c));
    });
  }

  onTabChanged(e: MatTabChangeEvent) {
    console.log(e);
    this.categoriesService.selectCategory(e.index);
  }

  onSubmit() {}

}
