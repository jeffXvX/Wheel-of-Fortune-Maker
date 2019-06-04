import { Categories } from './../game/categories/categories.model';

export class LoadCategoriesForm {
    static type = "[Categories Form] Load";
    constructor(public payload: { categories: Categories }) {}
}

export class LoadDefaultCategoriesForm {
    static type = "[Categories Form] Load Default";
}
