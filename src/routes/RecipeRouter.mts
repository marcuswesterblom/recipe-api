import express from "express";
import Recipe from "../models/Recipe.mjs";

export const recipeRouter = express.Router();

// Get Recipes from database
recipeRouter.get("/api/recipes", async (_, res) => {
    try {
        const getRecipes = await Recipe.find();
        res.status(200).json({
            success: true,
            count: getRecipes.length,
            recipes: getRecipes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
// Create recipes
recipeRouter.post("/api/recipes", async (req, res) => {
    try {
        const createRecipe = await Recipe.create(req.body);
        res.status(200).json({
            success: true,
            data: createRecipe
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Couldn't create recipe",
            error: error instanceof Error ? error.message: "Okänt fel"
        });
    }
}); 
// Update recipe
recipeRouter.put("/api/recipes/:id", async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json({
            success: true,
            data: updatedRecipe
        });

    } catch (err) {
        res.status(400).json({ 
            message: err instanceof Error ? err.message : "Unknown error"
        });
    }
});

// Delete recipe
recipeRouter.delete("/api/recipes/:id", async (req, res) => {
    try {
        const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id);

        if (!deleteRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.json({
            success: true,
            data: deleteRecipe
        });

    } catch (err) {
        res.status(400).json({ 
            message: err instanceof Error ? err.message : "Unknown error"
        });
    }
});
