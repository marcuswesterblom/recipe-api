import Recipe from "../models/Recipe.mjs";
import type { Request, Response } from "express";

// Get Recipes from database
export const getRecipes = async (_: Request, res: Response) => {
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
};
// Create recipes
export const createRecipes = async (req: Request, res: Response) => {
    try {
        const createRecipe = await Recipe.create(req.body);
        res.status(201).json({
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
}; 
// Update recipe
export const updateRecipes = async (req: Request, res: Response) => {
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
};

// Delete recipe
export const deleteRecipes = async (req: Request, res: Response) => {
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
};
