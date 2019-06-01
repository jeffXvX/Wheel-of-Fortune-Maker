import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CategoriesForm } from './categories-form.model';
import { LoadCategoriesForm } from './categories-form.actions';
import { copyCategories } from '../game/categories/categories.model';
​
@State<CategoriesForm>({
  name: 'categoriesForm',
  defaults: {
    dirty: false,
    status: "",
    errors: {},
    model: { categories: [] }
  }
})
export class CategoriesFormState {
  @Selector() static form(state: CategoriesForm) {
    return state;
  }

  @Action(LoadCategoriesForm)
  loadGameConfig(ctx: StateContext<CategoriesForm>, action: LoadCategoriesForm) {
    console.log('loading categories form', action.payload.categories);
    
    let catsAndPuzzles = action.payload.categories.map(category=>({
      name: category.name,
      id: category.id, 
      puzzles: action.payload.puzzles[category.id]
    }));

    ctx.setState({
        ...ctx.getState(),
        model: { categories: catsAndPuzzles }
    });
  }

  private createCategoriesForm(config: any) {
    const game = copyCategories(config.categories);
  }

}