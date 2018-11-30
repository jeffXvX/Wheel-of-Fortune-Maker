import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Category } from './category.model';
import { defaultCategories } from './default_categories.model';
import { ChangeCategoryName } from './categories.actions';
​
@State<Category[]>({
  name: 'categories',
  defaults: defaultCategories()
})
export class CategoriesState {
  @Selector() static category(state: Category[]) {
    return (id:number)=> state.filter(s=>s.id === id)[0];
  } 

  @Selector() static categories(state: Category[]) {
    return state;
  }

  @Action(ChangeCategoryName)
  changeName(ctx: StateContext<Category[]>, action: ChangeCategoryName) {
    const state = ctx.getState();
    let idx = state.findIndex((cat: Category)=>cat.id === action.id);
    let category = { ...state[idx] };
    category.name = action.name;
    state[idx] = category;
    ctx.setState([
      ...state 
    ]);
  }

}