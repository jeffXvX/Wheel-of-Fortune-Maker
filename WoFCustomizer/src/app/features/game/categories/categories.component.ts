import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from './categories.model';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'wof-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$: Observable<Categories>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.categories$;
    this.categories$.subscribe(c=>console.log('cat',c));
  }

}
