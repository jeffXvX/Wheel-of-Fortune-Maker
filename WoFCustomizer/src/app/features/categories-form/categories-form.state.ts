import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CategoriesFormModel, defaultCategoriesFormModel } from './categories-form.model';
import { LoadCategoriesForm, LoadDefaultCategoriesForm } from './categories-form.actions';
import { copyCategories } from '../game/categories/categories.model';
​
@State<CategoriesFormModel>({
  name: 'categoriesForm',
  defaults: defaultCategoriesFormModel()
})
export class CategoriesFormState {
  @Selector() static state(state: CategoriesFormModel) {
    return state;
  }

  @Selector() static loaded(state: CategoriesFormModel) {
    return state.model.categories.length > 0;
  } 

  @Action(LoadCategoriesForm)
  loadCategoriesForm(ctx: StateContext<CategoriesFormModel>, action: LoadCategoriesForm) {
    console.log('loading categories form', action.payload.categories);
    
    let catsAndPuzzles = action.payload.categories.map(category=>({
      name: category.name,
      id: category.id
    }));

    ctx.setState({
        ...ctx.getState(),
        model: { categories: catsAndPuzzles }
    });
  }

  @Action(LoadDefaultCategoriesForm)
  loadDefaultCategoriesForm(ctx: StateContext<CategoriesFormModel>) {
    ctx.setState(defaultCategoriesFormModel());
  }

  private createCategoriesForm(config: any) {
    const game = copyCategories(config.categories);
  }

}