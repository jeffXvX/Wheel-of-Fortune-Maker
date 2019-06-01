import { State, Selector, Action, StateContext, Actions } from '@ngxs/store';
import { Category, maxCategoryNameLength } from '../category/category.model';
import { defaultCategories } from './default_categories.model';
import { ChangeCategoryName, SetCategories, ResetCategories, SelectCategory } from './categories.actions';
import { SetCategory } from '../category/category.actions';
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
    ctx.dispatch(new SetCategory({ category: action.categories[0] }));    
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

  @Action(SelectCategory)
  selectCategory(ctx: StateContext<Category[]>, action: SelectCategory) {
    let categories = ctx.getState();
    ctx.dispatch(new SetCategory({ category: categories[action.payload.index] }));
  }

}