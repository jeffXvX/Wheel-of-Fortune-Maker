import { Categories } from "../game/categories/categories.model";
import { Puzzle } from "../game/puzzle/puzzle.model";
import { Category } from "../game/category/category.model";

export interface CategoryAndPuzzlesFormModel extends Category {
    puzzles: Puzzle[];
}

export interface CategoriesForm {
    dirty: false,
    status: "",
    errors: {},
    model: { 
        categories: CategoryAndPuzzlesFormModel[],
    },
}