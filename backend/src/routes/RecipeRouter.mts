import express from "express";
import { createRecipes, deleteRecipes, getRecipes, updateRecipes } from "../controllers/controller.mjs";

export const recipeRouter = express.Router();

recipeRouter.get("/", getRecipes);
recipeRouter.post("/", createRecipes);
recipeRouter.put("/:id", updateRecipes);
recipeRouter.delete("/:id", deleteRecipes);
