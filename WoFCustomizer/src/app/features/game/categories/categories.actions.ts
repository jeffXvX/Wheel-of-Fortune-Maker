import { Category } from "../category/category.model";

export class ChangeCategoryName {
    static readonly type = '[Category] Change Name';
    constructor(public id: number, public name: string) {}
}

export class SetCategories {
    static readonly type = '[Category] Set Categories';
    constructor(public categories: Category[]) {}
}

export class ResetCategories {
    static readonly type = '[Category] Reset Categories';
}