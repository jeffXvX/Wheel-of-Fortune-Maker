import { Category } from "./category.model";

export class SetCategory {
    static readonly type = '[Category] Set Category';
    constructor(public payload: { category: Category }) {}
}
