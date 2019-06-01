import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Category, maxCategoryNameLength } from '../category/category.model';
import { SetCategory } from './category.actions';
​
@State<Category>({
  name: 'category'
  //defaults: defaultCategories()
})
export class CategoryState {
  @Selector() static category(state: Category) {
    return state;
  } 

  @Action(SetCategory)
  SetCategories(ctx: StateContext<Category>, action: SetCategory) {
    ctx.setState(action.payload.category);
  }
  
  /*
  @Action(SetCategories)
  SetCategories(ctx: StateContext<Category[]>, action: SetCategories) {
    ctx.setState(action.categories);
  }
  */

}