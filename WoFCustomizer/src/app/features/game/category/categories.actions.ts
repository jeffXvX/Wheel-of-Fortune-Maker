import { Category } from "./category.model";

export class ChangeCategoryName {
    static readonly type = '[Category] Change Name';
    constructor(public id: number, public name: string) {}
}

export class SetCategories {
    static readonly type = '[Category] Set Categories';
    constructor(public categories: Category[]) {}
}