import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Category, maxCategoryNameLength } from '../category/category.model';
import { defaultCategories } from './default_categories.model';
import { ChangeCategoryName, SetCategories, ResetCategories } from './categories.actions';
​
@State<Category[]>({
  name: 'categories',
  defaults: []
  //defaults: defaultCategories()
})
export class CategoriesState {
  @Selector() static category(state: Category[]) {
    return (id:number)=> state.filter(s=>s.id === id)[0];
  } 

  @Selector() static categories(state: Category[]) {
    return state;
  }

  @Selector() static categoriesAreLoaded(state: Category[]) {
    return state.length > 0;
  }

  @Action(ResetCategories)
  ResetCategories(ctx: StateContext<Category[]>) {
    ctx.setState([]);
  }

  @Action(SetCategories)
  SetCategories(ctx: StateContext<Category[]>, action: SetCategories) {
    ctx.setState(action.categories);
  }

  @Action(ChangeCategoryName)
  changeName(ctx: StateContext<Category[]>, action: ChangeCategoryName) {
    const state = [...ctx.getState()];
    let idx = state.findIndex((cat: Category)=>cat.id === action.id);
    let category = { ...state[idx] };
    category.name = action.name.substr(0, maxCategoryNameLength);
    state[idx] = category;
    ctx.setState(state);
  }

}