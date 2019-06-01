import { Categories } from './../game/categories/categories.model';
import { Puzzles } from '../game/puzzles/puzzles.model';

export class LoadCategoriesForm {
    static type = "[Categories Form] Load";
    constructor(public payload: { categories: Categories, puzzles: Puzzles }) {}
}