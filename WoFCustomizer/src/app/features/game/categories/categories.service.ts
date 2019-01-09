import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { CategoriesState } from './categories.state';
import { Observable } from 'rxjs';
import { Categories } from './categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  @Select(CategoriesState.categories) categories$: Observable<Categories>;

  constructor() { }
}
