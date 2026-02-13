import type { Ingredient } from "./Ingredient";

export interface Recipe {
    title: string;
    description: string;
    ingredients: Ingredient[];
    category: string[];
    cookingTime: number;
    servings: number;
}