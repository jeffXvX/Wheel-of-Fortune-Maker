import { Categories } from "../game/categories/categories.model";
import { Puzzle } from "../game/puzzle/puzzle.model";
import { Category } from "../game/category/category.model";

export interface CategoryAndPuzzlesFormModel extends Category {
    puzzles: Puzzle[];
}

export interface CategoriesFormModel {
    dirty: false,
    status: "",
    errors: {},
    model: { 
        categories: Category[],
    },
}

export const defaultCategoriesFormModel = ():CategoriesFormModel => ({
    dirty: false,
    status: "",
    errors: {},
    model: { categories: [] }
})