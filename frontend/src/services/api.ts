import type { Recipe } from "../models/Recipe";

export const createRecipe = async (recipe: Recipe) => {
    const res = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipe)
    });
    return res.json();
}