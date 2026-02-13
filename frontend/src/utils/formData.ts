import type { Recipe } from "../models/Recipe";
import { getIngredients } from "./ingredientManager";

export const buildRecipeFromForm = (
    form: HTMLFormElement,
    ingredientsContainer: HTMLElement,
    categorySelect: HTMLSelectElement
): Recipe => {
    const formData = new FormData(form);
    const ingredients = getIngredients(ingredientsContainer);
    const selectedCategory = categorySelect.value;
    const category = selectedCategory ? [categorySelect.value] : ["Other"];

    return {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        cookingTime: Number(formData.get("cookingTime")),
        servings: Number(formData.get("servings")),
        ingredients,
        category
    };
}