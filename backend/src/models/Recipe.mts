import { model } from "mongoose";
import mongoose, { type InferSchemaType } from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        name: String,
        amount: String
    }],
    category: {
        type: [String],
        enum: ["Breakfast", "Lunch", "Dinner", "Entrée", "Main", "Dessert", "Snack", "Other"],
        default: "Other"
    },
    cookingTime: {
        type: Number,
        required: true
    },
    servings: {
        type: Number,
        required: true
    }
});

const Recipe = model("Recipe", recipeSchema);

export default Recipe;
