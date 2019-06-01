import { Category } from "../category/category.model";

export class ChangeCategoryName {
    static readonly type = '[Categories] Change Name';
    constructor(public id: number, public name: string) {}
}

export class SetCategories {
    static readonly type = '[Categories] Set Categories';
    constructor(public categories: Category[]) {}
}

export class ResetCategories {
    static readonly type = '[Categories] Reset Categories';
}

export class SelectCategory {
    static readonly type = '[Categories] Select Category';
    constructor(public payload: { index: number }) {}
}