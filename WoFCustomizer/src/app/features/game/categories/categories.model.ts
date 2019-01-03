import { Category } from "../category/category.model";

export type Categories = Category[];

export function copyCategories(categories: Categories): Categories {
    return [
        ...categories.map(cat=>({
            id: cat.id,
            name: cat.name
        }))
    ];
}